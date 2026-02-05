import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- important

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data));

      // Redirect based on role
      const role = res.data.role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "EMPLOYEE") {
        navigate("/employee");
      } else {
        alert("Role not supported");
      }
    } catch (err) {
  console.log("LOGIN ERROR:", err.response || err);
  alert(err.response?.data?.message || "Login failed");
}

  };

  return (
    <div className="page">
      <h2>Login</h2>
      <input
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
