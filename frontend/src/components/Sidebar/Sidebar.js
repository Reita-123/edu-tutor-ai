import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => (
  <nav className="sidebar">
    <div className="sidebar-title">EduTutor AI</div>
    <ul>
      <li>
        <NavLink to="/dashboard" activeclassname="active">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses" activeclassname="active">
          Courses
        </NavLink>
      </li>
      <li>
        <NavLink to="/quizzes" activeclassname="active">
          Quizzes
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" activeclassname="active">
          Profile
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Sidebar;