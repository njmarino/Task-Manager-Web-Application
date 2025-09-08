import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }
            try {
                const res = await axios.get('http://localhost:8000/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTasks(res.data.tasks);
            } catch (err) {
                setMessage('Failed to fetch tasks');
            }
        };
        fetchTasks();
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            <div id="navbar">
                <Link to="/create-task">Create New Task</Link>
                <Link to="/">Logout</Link>
            </div>
            <div>{message}</div>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p id={task.completed ? 'task-completed' : 'task-not-completed'}>
                            Status: {task.completed ? 'Completed' : 'Pending'}
                        </p>
                        <Link to={`/edit-tasks/${task._id}`}>Edit Task</Link>
                    </li>
                ))}
            </ul>
        </div>
    );

}
    
export default Dashboard;