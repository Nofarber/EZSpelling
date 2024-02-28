import React, { useState } from "react";
import { login } from "../utils/AuthService";
import { useNavigate } from "react-router-dom";

function Login({teacherOrStudent}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      console.log(response.data.user);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem('currentUser',JSON.stringify(response.data.user))
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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