const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

router.post('/studentlog',  studentController.studentLogin);


module.exports = router;
