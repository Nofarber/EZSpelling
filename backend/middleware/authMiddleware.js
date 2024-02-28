const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
require ('dotenv').config({path:"./.env"});
cookieParser()

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      console.log(decodedToken);
      const teacher = await Teacher.findById(decodedToken._id)
        .populate("students")
        .populate("lessons")
        .exec();
      req.teacher = teacher;
      next();
    } catch (e) {
        res.send(e)
    }
};

module.exports = authMiddleware;
