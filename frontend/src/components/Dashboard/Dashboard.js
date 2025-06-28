import React, { useState } from "react";
import "./Dashboard.css";

const initialLearningPath = [
  { title: "Algebra Fundamentals", percent: 100, status: "completed" },
  { title: "Trigonometry Basics", percent: 100, status: "completed" },
  { title: "Calculus - Derivatives", percent: 40, status: "current" },
  { title: "Calculus - Integration", percent: 0, status: "pending" },
  { title: "Advanced Statistics", percent: 0, status: "pending" },
];

const Dashboard = ({ user, onLogout }) => {
  const [completedLessons, setCompletedLessons] = useState(12);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [overallProgress, setOverallProgress] = useState(65);
  const [subject, setSubject] = useState("Advanced Mathematics");
  const [topic, setTopic] = useState("Calculus - Derivatives");
  const [subjectProgress, setSubjectProgress] = useState(40);
  const [learningPath, setLearningPath] = useState(initialLearningPath);

  // Dummy "Complete Lesson" logic
  const handleCompleteLesson = () => {
    setCompletedLessons((c) => c + 1);
    setCurrentStreak((s) => s + 1);
    setOverallProgress((p) => Math.min(p + 5, 100));
    setSubjectProgress((sp) => {
      const next = Math.min(sp + 15, 100);
      // Progress learning path
      if (next === 100) {
        // Move to next path item
        const idx = learningPath.findIndex((p) => p.status === "current");
        if (idx !== -1 && idx + 1 < learningPath.length) {
          const newPath = learningPath.map((item, i) =>
            i === idx
              ? { ...item, percent: 100, status: "completed" }
              : i === idx + 1
              ? { ...item, percent: 0, status: "current" }
              : item
          );
          setLearningPath(newPath);
          setSubject(newPath[idx + 1].title.split(" - ")[0]);
          setTopic(newPath[idx + 1].title);
          setSubjectProgress(0);
        }
      }
      return next === 100 ? 100 : next;
    });
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="header">
          <h1>
            Welcome back, <span id="userName">{user || "Student"}</span>!
          </h1>
          <div className="user-info">
            <div className="avatar" id="userAvatar">
              {(user || "S")[0].toUpperCase()}
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <h3>📊 Learning Progress</h3>
            <div className="stats">
              <div className="stat-item">
                <h4 id="completedLessons">{completedLessons}</h4>
                <p>Lessons Completed</p>
              </div>
              <div className="stat-item">
                <h4 id="currentStreak">{currentStreak}</h4>
                <p>Day Streak</p>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p>Overall Progress: {overallProgress}%</p>
            <button className="login-btn" onClick={handleCompleteLesson}>
              Complete Lesson
            </button>
          </div>

          <div className="card">
            <h3>🎯 Current Subject</h3>
            <h4 id="currentSubject">{subject}</h4>
            <p id="currentTopic">Topic: {topic}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${subjectProgress}%` }}
              ></div>
            </div>
            <p>Subject Progress: {subjectProgress}%</p>
          </div>

          <div className="card learning-path">
            <h3>📚 Personalized Learning Path</h3>
            <div id="learningPath">
              {learningPath.map((item, i) => (
                <div
                  className={
                    "path-item " +
                    (item.status === "completed"
                      ? "completed"
                      : item.status === "current"
                      ? "current"
                      : "")
                  }
                  key={item.title}
                >
                  <span>
                    {item.status === "completed"
                      ? "✅"
                      : item.status === "current"
                      ? "📖"
                      : "⏳"}{" "}
                    {item.title}
                  </span>
                  <span>{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AIDemoChat topic={topic} />
      </div>
    </div>
  );
};

function AIDemoChat({ topic }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello! I'm your AI tutor. I can help you with personalized explanations, practice problems, and answer any questions about your current topic: ${topic}. What would you like to work on today?`,
    },
  ]);
  const [input, setInput] = useState("");

  // Dummy AI reply logic
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: input },
      {
        sender: "ai",
        text:
          "That's a great question! (This is a demo AI reply. In production, this would be powered by a backend or AI service.)",
      },
    ]);
    setInput("");
  };

  return (
    <div className="ai-tutor">
      <h3>🤖 AI Tutor Chat</h3>
      <div className="chat-messages" id="chatMessages">
        {messages.map((msg, i) => (
          <div
            className={"message " + (msg.sender === "ai" ? "ai" : "user")}
            key={i}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          id="chatInput"
          placeholder={`Ask me anything about "${topic}"...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button className="send-btn" onClick={handleSend} disabled={!input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Dashboard;