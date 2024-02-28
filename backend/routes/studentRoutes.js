const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

router.post('/studentlog',  studentController.studentLogin);
router.post('/studentlogout',  studentController.logout);


module.exports = router;
