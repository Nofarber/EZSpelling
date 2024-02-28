const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { PDFDocument } = require("pdf-lib");
const fontkit = require("fontkit");
const fs = require("fs");
const Teacher = require('../models/teacherModel')

dotenv.config();

exports.savePDF = async (req, res) => {
    try {
      const { answers, _id } = req.body;
      console.log(req.body);
      const fontBytes = await fs.readFileSync(
        "../frontend/src/fonts/Rubik-Regular.ttf"
      );
  
      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit); // Move this line here
  
      const rubikFont = await pdfDoc.embedFont(fontBytes);
      const page = pdfDoc.addPage();
      page.setFont(rubikFont);
      page.drawText(` שם פרטי: ${answers.firstname}`, { x: 50, y: 500 });
      page.drawText(`שם משפחה: ${answers.lastname}`, { x: 450 });
      page.drawText(`מקום ההתנבות: ${answers.volenteeringPlace}`, {
        x: 50,
        y: 400,
      });
      page.drawText(`פרטים על ההתנדבות: ${answers.finalText}`, { x: 50, y: 350 });
  
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync("output.pdf", pdfBytes);
      const student = await Student.findById(_id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      student.pdfFile = pdfBytes.toString("base64");
      await student.save();
  
      res.status(200).json({ message: "PDF saved successfully", data:student });
    } catch (error) {
      console.error("Error saving PDF:", error);
      res.status(500).json({ error: error.message });
    }
  };

exports.studentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const student = await Student.findOne({ username, role: "student" });
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials1" });
    }
        const isPasswordMatch = await bcrypt.compare(password, student.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials2' });
        }
        const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60000,
            sameSite: "strict",
        })
        const t1 = student
        delete t1.password
        res.status(200).json({ status: "success", data: t1 })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60000,
      sameSite: "strict",
    });
    const t1 = student;
    delete t1.password;
    res.status(200).json({ status: "success", data: t1 });
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.compose = async (req, res) => {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const api_key = "AIzaSyD8d3BngoQRLaEWezgHo0nHwzoTD1gNAAQ";
  const genAI = new GoogleGenerativeAI(api_key);
  const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });
  try {
    const {
      firstname,
      lastname,
      claSs,
      volenteeringPlace,
      volenteeringSum,
      volenteeringGood,
      volenteeringbad,
      whatILearned,
      whatIContributed,
      finalText,
    } = req.body;
    const prompt = `שם: ${firstname},
         שם משפחה: ${lastname},
         כיתה: ${claSs},
          מקום התנדבות: ${volenteeringPlace},
           איך הייתה ההתנדבות בכללי: ${volenteeringSum},
           דבר טוב אחד שהיה לי בהתנדבות: ${volenteeringGood},
           דבר רע אחד שהיה לי בהתנדבות: ${volenteeringbad},
           מה למדתי מההתנדבות: ${whatILearned},
           איך אני מרגיש שאנשים הרוויחו מההתנדבות שלי: ${whatIContributed}
           this is the information provided by a pupil who volenteerd in the community, please use all of the information in order to write a short paragraph, in hebrew, from the perspective of the pupil, describing how was his experience as a volenteer.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json({ status: "success", data: response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const id = req.body._id;
    let student = await Student.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } else {
      res.status(200).json({ status: "success", data: student });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

