import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Sidebar from "./components/Sidebar/Sidebar";
import Courses from "./components/Courses/Courses";
import Quizzes from "./components/Quizzes/Quizzes";
import Profile from "./components/Profile/Profile";

// Add Google OAuth logic
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [googleAccessToken, setGoogleAccessToken] = useState(""); // Store Google token if needed

  // Login handler: Connects to backend
  const handleLogin = async (username, password, navigate) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // If status is not 200, treat as invalid credentials
      if (!response.ok) {
        const errData = await response.json();
        alert("Login failed: " + (errData.message || "Invalid credentials."));
        return;
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user.name); // or data.user.username if you want
        setLoggedIn(true);
        setGoogleAccessToken(""); // Not a Google login
        navigate("/dashboard");
      } else {
        alert("Login failed: Invalid credentials.");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  // Google login handler
  const handleGoogleLogin = (accessToken, navigate) => {
    // Optionally: fetch user info with the access token here
    setUser("Google User"); // You could fetch/display real name if you want
    setLoggedIn(true);
    setGoogleAccessToken(accessToken);
    navigate("/dashboard");
  };

  // Demo login handler (unchanged)
  const handleDemo = (navigate) => {
    setUser("Demo Student");
    setLoggedIn(true);
    setGoogleAccessToken(""); // Not a Google login
    navigate("/dashboard");
  };

  // Logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUser("");
    setGoogleAccessToken("");
  };

  // Register handler (stub, expand for real registration)
  const handleRegister = (data, navigate) => {
    navigate("/login");
  };

  return (
    <Router>
      {loggedIn && <Sidebar />}
      <div style={loggedIn ? { marginLeft: 190, transition: "margin 0.2s" } : {}}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage
                  onLogin={handleLogin}
                  onDemo={handleDemo}
                  onGoogleLogin={handleGoogleLogin} // Pass Google login handler
                />
              )
            }
          />
          <Route
            path="/register"
            element={
              loggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <RegisterPage onRegister={handleRegister} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              loggedIn ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/courses"
            element={
              loggedIn ? <Courses googleAccessToken={googleAccessToken} /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/quizzes"
            element={
              loggedIn ? <Quizzes /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/profile"
            element={
              loggedIn ? <Profile /> : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;