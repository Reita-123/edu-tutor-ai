import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google"; // NEW: Import the hook
import "./LoginPage.css";

const LoginPage = ({ onLogin, onDemo, onGoogleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Google login handler
  const googleLogin = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly',
    flow: 'implicit',
    onSuccess: tokenResponse => {
      setError("");
      // Pass the access token up to App.js using a new prop
      if (onGoogleLogin) onGoogleLogin(tokenResponse.access_token, navigate);
    },
    onError: () => {
      setError("Google Login Failed");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");
    if (onLogin) onLogin(username, password, navigate);
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
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
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
        {/* --- GOOGLE SIGN-IN BUTTON --- */}
        <button
          className="btn google-btn"
          type="button"
          style={{ background: "#4285F4", color: "#fff", marginTop: 12 }}
          onClick={() => googleLogin()}
        >
          Sign in with Google
        </button>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <span>Don't have an account? </span>
          <Link to="/register" style={{ color: "#667eea", fontWeight: "bold", textDecoration: "none" }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;