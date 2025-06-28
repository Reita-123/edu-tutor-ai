import React, { useEffect, useState } from "react";

// These are fallback courses for demo/sample purposes.
const sampleCourses = [
  {
    id: 1,
    name: "Algebra Fundamentals",
    teacher: "Mrs. Smith",
    progress: 100,
    assignments: 8,
  },
  {
    id: 2,
    name: "Advanced Mathematics",
    teacher: "Mr. Lee",
    progress: 45,
    assignments: 3,
  },
];

const Courses = ({ googleAccessToken }) => {
  const [courses, setCourses] = useState(sampleCourses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // If logged in with Google, fetch Google Classroom courses
    if (googleAccessToken) {
      setLoading(true);
      fetch("https://classroom.googleapis.com/v1/courses", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Google Classroom API error");
          return res.json();
        })
        .then((data) => {
          // Google Classroom API returns courses as an array in 'courses'
          if (data.courses && Array.isArray(data.courses)) {
            setCourses(
              data.courses.map((course, idx) => ({
                id: course.id || idx,
                name: course.name || "Untitled",
                teacher:
                  (course.teacherFolder &&
                    course.teacherFolder.title) ||
                  "Google Classroom",
                progress: 0, // You can enhance this by fetching coursework/progress
                assignments: course.courseWorkMaterials
                  ? course.courseWorkMaterials.length
                  : 0,
              }))
            );
          } else {
            setCourses([]);
          }
          setLoading(false);
          setError("");
        })
        .catch((err) => {
          setError("Could not fetch Google Classroom courses. (" + err.message + ")");
          setCourses([]);
          setLoading(false);
        });
    } else {
      // Otherwise, try to fetch from backend API
      fetch("http://localhost:5000/api/courses")
        .then((res) => {
          if (!res.ok) throw new Error("API error");
          return res.json();
        })
        .then((data) => {
          setCourses(data);
          setLoading(false);
          setError("");
        })
        .catch(() => {
          // Fallback to sampleCourses if fetch fails
          setCourses(sampleCourses);
          setLoading(false);
          setError("");
        });
    }
    // Dependency includes googleAccessToken
  }, [googleAccessToken]);

  const handleJoinCourse = () => {
    setCourses([
      ...courses,
      {
        id: courses.length + 1,
        name: "New Joined Course",
        teacher: "Guest Teacher",
        progress: 0,
        assignments: 0,
      },
    ]);
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div style={{ padding: "32px" }}>
      <h2>📚 Courses</h2>
      <button onClick={handleJoinCourse} style={{ marginBottom: 24 }}>
        + Join New Course (Demo)
      </button>
      {error && (
        <div style={{ color: "red", marginBottom: 16 }}>
          {error}
        </div>
      )}
      {!googleAccessToken && (
        <div style={{ color: "orange", marginBottom: 16 }}>
          (Sign in with Google to view your Google Classroom courses)
        </div>
      )}
      <div style={{ maxWidth: 500 }}>
        {courses.length === 0 && (
          <div style={{ color: "#555" }}>
            No courses found.
          </div>
        )}
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              background: "#fff",
              marginBottom: 16,
              borderRadius: 12,
              padding: 18,
              boxShadow: "0 2px 12px rgba(80,80,140,0.08)",
            }}
          >
            <h3 style={{ margin: 0 }}>{course.name}</h3>
            <div style={{ color: "#555", fontSize: "0.97rem" }}>
              Teacher: {course.teacher}
            </div>
            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  background: "#e4ecff",
                  width: "100%",
                  height: 10,
                  borderRadius: 5,
                  overflow: "hidden",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)",
                    width: `${course.progress}%`,
                    height: "100%",
                    borderRadius: 5,
                  }}
                />
              </div>
              <span style={{ fontSize: "0.96rem" }}>
                Progress: {course.progress}%
              </span>
            </div>
            <div style={{ fontSize: "0.95rem", marginTop: 8 }}>
              Assignments: {course.assignments}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;