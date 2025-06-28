import React from "react";
import "./LandingPage.css";

const scenarios = [
  {
    title: "Personalized Learning Experience",
    desc: "Log in, sync courses from Google Classroom, and let EduTutor AI generate personalized quizzes and provide instant feedback using IBM Watsonx and Granite models."
  },
  {
    title: "Educator Dashboard & Performance Insights",
    desc: "Educators get a real-time dashboard with quiz history, scores, topics, and AI-driven insights from Pinecone—empowering data-driven teaching."
  },
  {
    title: "Diagnostic Testing and Adaptive Quizzing",
    desc: "New students take a diagnostic test powered by Watsonx. EduTutor AI adapts quiz difficulty and topics to match each student’s needs."
  },
  {
    title: "Google Classroom Integration",
    desc: "Seamlessly sync courses and student data from Google Classroom for automatic quiz generation and curriculum alignment."
  }
];

const LandingPage = () => (
  <div className="landing-root">
    <header className="landing-header">
      {/* Logo removed as per your request */}
      <h1>EduTutor AI</h1>
      <p className="landing-tagline">
        AI-powered personalized education platform for students and educators
      </p>
      <div className="landing-buttons">
        <a href="/login" className="landing-btn">Login</a>
        <a href="/register" className="landing-btn landing-btn-secondary">Sign Up</a>
      </div>
    </header>

    <section className="landing-features">
      <h2>Key Features</h2>
      <ul>
        <li>Dynamic quiz generation using IBM Watsonx & Granite models</li>
        <li>Real-time student evaluation & feedback</li>
        <li>Google Classroom integration</li>
        <li>Educator dashboard & performance insights</li>
        <li>Modular, scalable architecture</li>
      </ul>
    </section>

    <section className="landing-scenarios">
      <h2>How It Works</h2>
      <div className="landing-scenario-list">
        {scenarios.map((s, i) => (
          <div key={i} className="landing-scenario-card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <footer className="landing-footer">
      <p>
        &copy; {new Date().getFullYear()} EduTutor AI. Powered by IBM Watsonx, Granite, and Pinecone.
      </p>
    </footer>
  </div>
);

export default LandingPage;