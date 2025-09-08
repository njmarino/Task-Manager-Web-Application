const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;