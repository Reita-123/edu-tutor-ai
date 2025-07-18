import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ onLogin, onDemo, onGoogleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    if (onLogin) onLogin(email, password, navigate);
  };

  const handleDemo = () => {
    setError("");
    if (onDemo) onDemo(navigate);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1>🧠 EduTutor AI</h1>
          <p>Personalized Learning Experience</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <div style={{ color: "#e74c3c", marginBottom: 12 }}>{error}</div>}
          <button className="btn" type="submit">Sign In</button>
        </form>
        <button className="btn demo-btn" type="button" onClick={handleDemo}>
          Try Demo Account
        </button>

        {/* --- GOOGLE SIGN-IN BUTTON (redirect version) --- */}
        <a href="https://edu-tutor-ai.onrender.com/auth/google">
          <button
            className="btn google-btn"
            type="button"
            style={{ background: "#4285F4", color: "#fff", marginTop: 12 }}
          >
            Sign in with Google
          </button>
        </a>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <span>Don't have an account? </span>
          <Link
            to="/register"
            style={{ color: "#667eea", fontWeight: "bold", textDecoration: "none" }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;