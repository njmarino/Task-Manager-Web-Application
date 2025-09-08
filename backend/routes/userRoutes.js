const express = require('express');
const User = require('../models/user'); // Capitalized
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mongo } = require('mongoose');

router.get('/', async (req, res) => {
    res.send('User route is working');
});

//register user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send({ user, message: 'User registered successfully' });
    } catch (err) {
        res.status(400).send({ error: 'Registration failed', details: err.message });
    }
});

//user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id.toString() }, process.env.KEY);
        res.send({ user, token, message: 'Login successful' });
    } catch (error) {
        res.status(400).send({ error: 'Invalid login credentials' });
    }
});

module.exports = router;