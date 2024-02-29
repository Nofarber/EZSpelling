import React, { useState } from "react";
import { loginStudent } from "../utils/AuthService";
import { loginTeacher } from "../utils/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login({teacherOrStudent}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = teacherOrStudent? await loginStudent({ username, password }):await loginTeacher({ username, password });
      console.log(response.data);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem('currentUser',JSON.stringify(response.data.data))
      if (teacherOrStudent) {
        navigate("/student")
      } else{
        navigate("/teacher")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginContainer">
  <div className="loginHeader">
    {teacherOrStudent ? <h1 className="loginTitle">כניסת תלמיד</h1> : <h1 className="loginTitle">כניסת מורה</h1>}
  </div>
  <input
    type="text"
    className="loginInput"
    placeholder="שם משתמש"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="password"
    className="loginInput"
    placeholder="סיסמה"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button className="loginButton" onClick={handleLogin}>כניסה</button>
</div>
  );
}

export default Login;