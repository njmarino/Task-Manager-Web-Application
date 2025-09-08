import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/users/login', { username, password });
            setMessage(res.data.message);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setMessage('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            <div>
                <a href="/register">Register</a>
            </div>
            <div>{message}</div>
        </form>
    );
}

export default Login;