import { logout } from "./utils/AuthService";
import Signup from "./components/SignUp";
import Authenticate from "./components/UserData";
import Login from "./components/Login";
import Chet from "./components/Chet";
import LandingPage from "./components/LandingPage";
import { useInfo } from "./utils/context";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import { Routes, Route } from 'react-router-dom'
import TeacherPage from "./components/TeacherPage";
import StudentPage from "./components/StudentPage";
import "./App.css";
import React, { useState } from "react";
import PDF from "./components/PDF";

function App() {
  const [pdfData, setPdfData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (data) => {
    setPdfData(data);
    setShowPreview(false);
  };

  const handlePreviewButtonClick = () => {
    setShowPreview(true);
  };
  return (
    <>
    {<ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/teacher" element={<TeacherPage />}/>
      <Route path="/student" element={<StudentPage />}/>
      <Route path="/teacher_login" element={<Login teacherOrStudent={0} />}/>
      <Route path="/student_login" element={<Login teacherOrStudent={1}/>}/>
    </Routes> 
    </ThemeProvider> }
    <PDF />
    </>
  );
}

export default App;
