const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const teacher = new Teacher({ email, username, password: hashedPassword });
        await teacher.save();
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const teacher = await Teacher.findOne({ username })
        if (!teacher || !(await bcrypt.compare(password, teacher.password))) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect email or password",
            });
        } else {
            const token = jwt.sign({ _id: teacher._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 60000,
                sameSite: "strict",
            })
            const t1 = teacher
            delete t1.password
            res.status(200).json({ status: "success", data: t1 })

    }} catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.teacherLogout = async (req, res) => {
    try {
        res.clearCookie('token');

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, username, password } = req.body;
         

        const teacher = await Teacher.findById(id);


        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        if (email) teacher.email = email;
        if (username) teacher.username = username;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            teacher.password = hashedPassword;
        }

        await teacher.save();

        res.status(200).json({ message: 'Teacher updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.body; 

        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        await Teacher.deleteOne({ _id: id });

        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();

        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createStudent = async (req, res) => {
    try {
        const { username, password, studentName } = req.body;

        if (!req.user) {
            return res.status(401).json({ error: 'Teacher user not found' });
        }

        const teacher = await Teacher.findById(req.user._id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher user not found in the database' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({ username, password: hashedPassword, role: 'student', studentName });
        newStudent.teacher = teacher._id;

        await newStudent.save();

        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        let student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (username) student.username = username;
        if (password) student.password = password;

        await student.save();

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await Student.deleteOne({ _id: id });

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const currentTeacher = req.body._id
        const students = await Student.find({teacher: currentTeacher});
        res.status(200).json({status:"success",data:students});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllStudentsByTeacher = async (req, res) => {
    try {
        const teacherId = req.user._id;

        const students = await Student.find({ teacher: teacherId });

        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: error.message });
    }
};