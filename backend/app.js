const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const Teacher = require('./models/teacherModel')
const Student = require('./models/studentModel')


app.use(express.json());
const corsOpts = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOpts))


const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/api/teacher', teacherRoutes);
app.use('/api/students', studentRoutes);

app.get('/api/data', async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        const students = await Student.find({});

        const data = {
            // teacherUsername: teacher.username,
            // studentName: student.studentName,
            // teacherEmail: teacher.email
            teachers: teachers,
            students: students
        };

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
