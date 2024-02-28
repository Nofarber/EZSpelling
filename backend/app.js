const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());


const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/api/teacher', teacherRoutes);
app.use('/api/students', studentRoutes);

module.exports = app;
