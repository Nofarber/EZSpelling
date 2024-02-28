import React, { useState } from "react";
import { signup } from "../utils/AuthService";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSignup = async () => {
    try {
      const response = await signup({ email, password ,role});
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <input
        type="text"
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
      <input
        type="checkbox"
        onChange={(e) => e?setRole('admin'):setRole('user')}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;