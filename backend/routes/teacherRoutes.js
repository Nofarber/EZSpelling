const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');

router.post('/register', teacherController.register);
router.post('/login', teacherController.login);
router.post('/logout', teacherController.teacherLogout);
router.post('/updateteacher', teacherController.updateTeacher);
router.delete('/teacherdel', teacherController.deleteTeacher);
router.get('/allteacher', teacherController.getAllTeachers)
router.post('/student', teacherController.createStudent);
router.put('/student/:id', teacherController.updateStudent);
router.delete('/delstudent/:id', teacherController.deleteStudent);
router.get('/allstudents', teacherController.getAllStudents);
router.post('/teachersstudents', teacherController.getAllStudentsByTeacher);
module.exports = router;
