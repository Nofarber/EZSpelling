const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

router.post('/studentlog',  studentController.studentLogin);
router.post('/compose',  studentController.compose);
router.post('/update',  studentController.updateStudent);
router.post('/studentlogout',  studentController.logout);
router.post('/save-pdf', studentController.savePDF);



module.exports = router;
