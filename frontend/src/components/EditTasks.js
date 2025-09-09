import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditTasks() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:8000/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTitle(res.data.task.title);
                setDescription(res.data.task.description);
                setCompleted(res.data.task.completed);
            } catch (err) {
                setMessage('Failed to fetch task');
                console.error(err);
            }
        };
        fetchTask();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                `http://localhost:8000/tasks/${id}`,
                { title, description, completed },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Task updated!');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (err) {
            setMessage('Failed to update task');
        }
    };

    //delete task function
    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Task deleted!');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (err) {
            setMessage('Failed to delete task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type="button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            </div>
            <h2>Edit Task</h2>
            <div>
                <input
                    type="text"
                    value= {title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        unchecked={false}
                        onChange={e => setCompleted(e.target.checked)}
                    />
                    Completed
                </label>
            </div>
            <div>
                <button type="submit">Update Task</button>
            </div>
            <div>
                <button type="button" id="delete-button" onClick={handleDelete}>Delete Task</button>
            </div>
            <div>{message}</div>
        </form>
    );
}

export default EditTasks;