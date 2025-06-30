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
  const [googleAccessToken, setGoogleAccessToken] = useState("");

  // ✅ Login handler updated to send email instead of username
  const handleLogin = async (username, password, navigate) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }), // 👈 changed username ➝ email
      });

      if (!response.ok) {
        const errData = await response.json();
        alert("Login failed: " + (errData.message || "Invalid credentials."));
        return;
      }

      const data = await response.json();

      // ✅ Check for user object and update name
      if (data.token && data.user) {
        setUser(data.user.email); // You could use `data.user.email` or `.name` if available
        setLoggedIn(true);
        setGoogleAccessToken("");
        navigate("/dashboard");
      } else {
        alert("Login failed: Invalid response from server.");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleGoogleLogin = (accessToken, navigate) => {
    setUser("Google User");
    setLoggedIn(true);
    setGoogleAccessToken(accessToken);
    navigate("/dashboard");
  };

  const handleDemo = (navigate) => {
    setUser("Demo Student");
    setLoggedIn(true);
    setGoogleAccessToken("");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser("");
    setGoogleAccessToken("");
  };

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
                  onGoogleLogin={handleGoogleLogin}
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
            element={loggedIn ? <Quizzes /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={loggedIn ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
