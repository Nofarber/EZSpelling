const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', teacherController.register);
router.post('/login', teacherController.login);
router.post('/student', authMiddleware, teacherController.createStudent);
router.put('/student/:id', authMiddleware, teacherController.updateStudent);
router.delete('/student/:id', authMiddleware, teacherController.deleteStudent);
router.get('/student', authMiddleware, teacherController.getAllStudents);

module.exports = router;
