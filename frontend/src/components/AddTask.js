import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to add a task.');
            return;
        }
        try {
            await axios.post(
                'http://localhost:8000/tasks',
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Task added!');
            navigate('/dashboard');
        } catch (err) {
            setMessage('Failed to add task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type="button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            </div>
            <h2>Add Task</h2>
            <div>
                <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            </div>
            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <div>
                <button type="submit">Add Task</button>
            </div>
            
            <div>{message}</div>
        </form>
    );
}

export default AddTask;