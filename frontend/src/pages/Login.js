import React, { useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Login() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [courseWork, setCourseWork] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleAccessToken = async (token) => {
    setLoading(true);
    setError("");
    setAccessToken(token);
    try {
      const res = await fetch(
        "https://classroom.googleapis.com/v1/courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.courses) {
        setCourses(data.courses);
      } else if (data.error) {
        setError(data.error.message || "Unknown error.");
      } else {
        setError("No courses found.");
      }
    } catch (e) {
      setError("Failed to fetch courses.");
    }
    setLoading(false);
  };

  const fetchCourseWork = async (courseId) => {
    setLoading(true);
    setSelectedCourse(courseId);
    setError("");
    setCourseWork([]);
    try {
      const res = await fetch(
        `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      if (data.courseWork && data.courseWork.length > 0) {
        setCourseWork(data.courseWork);
      } else {
        setCourseWork([]);
        setError("No assignments found for this course.");
      }
    } catch (e) {
      setError("Failed to fetch assignments.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLoginButton onAccessToken={handleAccessToken} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {courses && (
        <div>
          <h3>Your Google Classroom Courses:</h3>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                {course.name}{" "}
                <button onClick={() => fetchCourseWork(course.id)}>
                  View Assignments
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCourse && (
        <div>
          <h3>Assignments for selected course:</h3>
          {loading && <p>Loading assignments...</p>}
          {!loading && courseWork.length > 0 && (
            <ul>
              {courseWork.map((cw) => (
                <li key={cw.id}>
                  <strong>{cw.title}</strong> — {cw.description || "No description"}
                </li>
              ))}
            </ul>
          )}
          {!loading && courseWork.length === 0 && !error && (
            <p>No assignments found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;