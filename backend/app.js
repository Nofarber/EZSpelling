const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();


app.use(express.json());
const corsOpts = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOpts))


const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/api/teacher', teacherRoutes);
app.use('/api/students', studentRoutes);

module.exports = app;
