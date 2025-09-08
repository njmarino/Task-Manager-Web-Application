const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}

module.exports = auth;