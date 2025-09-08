const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoute');

require('dotenv').config();

app.use(cors());
require('./database');
const PORT = 8000;

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Task Manager' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});