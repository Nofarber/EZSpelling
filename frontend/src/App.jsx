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



function App() {
const useUser = useInfo()
  const setCurrentUser = useUser.SetCurrentUser
  
  return (
    <>
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/teacher" element={<TeacherPage />}/>
      <Route path="/student" element={<StudentPage />}/>
      <Route path="/teacher_login" element={<Login teacherOrStudent={0} />}/>
      <Route path="/student_login" element={<Login teacherOrStudent={1}/>}/>
    </Routes> 
    </ThemeProvider>
{/*     
      <Login />
      <Signup />
      <Authenticate />
      <button onClick={() => {logout(),setCurrentUser(null)}}>Logout</button>
      <Chet/> */}
    </>
  );
}

export default App;
