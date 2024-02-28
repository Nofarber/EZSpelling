import React, { useState } from "react";
import { loginStudent } from "../utils/AuthService";
import { loginTeacher } from "../utils/AuthService";
import { useNavigate } from "react-router-dom";

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
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <div>{teacherOrStudent?<h1>כניסת תלמיד</h1>:<h1>כניסת מורה</h1>}</div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;