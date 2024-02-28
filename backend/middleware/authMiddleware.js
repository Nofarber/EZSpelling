const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');
const dotenv = require("dotenv");
require ('dotenv').config({path:"./.env"});

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ error: 'Authentication token missing' });
        }

        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Invalid token format' });
        }

        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        const user = await Teacher.findOne({ _id: decoded.userId }); 
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = authMiddleware;
