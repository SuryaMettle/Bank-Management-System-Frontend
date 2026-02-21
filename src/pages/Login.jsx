import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("user", JSON.stringify(res.data));

      const role = res.data.role;

      if (role === "ADMIN") navigate("/admin");
      else if (role === "EMPLOYEE") navigate("/employee");
      else alert("Role not supported");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response || err);
      alert(err.response?.data || "Login failed");
    }
  };

  const handleForgotPassword = async () => {
    try {
      // For simplicity, backend expects tempPassword
      const tempPassword = prompt("Enter a temporary password to reset to:");
      if (!tempPassword) return;

      const res = await API.post("/auth/forgot-password", {
        email: forgotEmail,
        tempPassword,
      });
      alert(res.data);
    } catch (err) {
      console.log(err.response || err);
      alert(err.response?.data || "Reset failed");
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <div style={{ marginTop: "20px" }}>
        <h4>Forgot Password?</h4>
        <input
          placeholder="Enter your email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
        />
        <button onClick={handleForgotPassword}>Reset Password</button>
      </div>
    </div>
  );
}

export default Login;
