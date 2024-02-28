const Student = require('../models/studentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
exports.studentLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const student = await Student.findOne({ username, role: 'student' });
        if (!student) {
            return res.status(401).json({ message: 'Invalid credentials1' });
        }

        const isPasswordMatch = await bcrypt.compare(password, student.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials2' });
        }

        const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
