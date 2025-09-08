import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 
import EditTasks from './components/EditTasks';
import './App.css';
import AddTask from './components/AddTask';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-task" element={<AddTask />} />
          <Route path="/edit-tasks/:id" element={<EditTasks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;