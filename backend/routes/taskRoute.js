const express = require('express');
const user = require('../models/user');
const router = express.Router();
const auth = require('../middlewares/authentication');
const Task = require('../models/Task');

router.get('/test', auth, (req, res) => {
    res.json({ message: 'Authenticated route', user: req.user });
});

//create task
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            user: req.user._id
        });
        await task.save();
        res.status(201).json({ task, message: 'Task created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

//get tasks for user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({ tasks, count: tasks.length, message: 'Tasks fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//fetch task by id
router.get('/:id', auth, async (req, res) => {
    const taskid = req.params.id;
    try {
        const task = await Task.findOne({ _id: taskid, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task, message: 'Task fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//update task
router.put('/:id', auth, async (req, res) => {
    const taskid = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findOne({ _id: taskid, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//delete task
router.delete('/:id', auth, async (req, res) => {
    const taskid = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id: taskid, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;