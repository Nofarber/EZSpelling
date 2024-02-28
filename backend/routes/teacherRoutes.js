const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', teacherController.register);
router.post('/login', teacherController.login);
router.post('/logout', authMiddleware, teacherController.teacherLogout);

router.post('/updateteacher',authMiddleware, teacherController.updateTeacher);
router.delete('/teacherdel',authMiddleware, teacherController.deleteTeacher);
router.get('/allteacher', teacherController.getAllTeachers)
router.post('/student', authMiddleware, teacherController.createStudent);
router.put('/student/:id', authMiddleware, teacherController.updateStudent);
router.delete('/delstudent/:id', authMiddleware, teacherController.deleteStudent);
router.get('/allstudents', authMiddleware, teacherController.getAllStudents);
router.get('/teachersstudents', authMiddleware, teacherController.getAllStudentsByTeacher);

module.exports = router;
