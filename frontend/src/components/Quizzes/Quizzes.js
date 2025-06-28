import React, { useState } from "react";

const demoQuizzes = [
  {
    id: 1,
    title: "Algebra Quiz 1",
    score: 9,
    total: 10,
    date: "2025-06-15",
  },
  {
    id: 2,
    title: "Calculus Practice",
    score: 7,
    total: 10,
    date: "2025-06-22",
  },
];

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState(demoQuizzes);

  const handleTakeQuiz = () => {
    setQuizzes([
      ...quizzes,
      {
        id: quizzes.length + 1,
        title: `Demo Quiz ${quizzes.length + 1}`,
        score: Math.floor(Math.random() * 11),
        total: 10,
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>📝 Quizzes</h2>
      <button onClick={handleTakeQuiz} style={{ marginBottom: 24 }}>
        + Take New Quiz (Demo)
      </button>
      <div style={{ maxWidth: 500 }}>
        {quizzes.map((q) => (
          <div
            key={q.id}
            style={{
              background: "#fff",
              marginBottom: 16,
              borderRadius: 12,
              padding: 18,
              boxShadow: "0 2px 12px rgba(80,80,140,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>{q.title}</div>
              <div style={{ color: "#888", fontSize: "0.98rem" }}>
                Date: {q.date}
              </div>
            </div>
            <div
              style={{
                fontWeight: 700,
                color: "#43e97b",
                fontSize: "1.15rem",
              }}
            >
              {q.score}/{q.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;