import React, { useEffect } from "react";

// Replace with your actual Client ID
const GOOGLE_CLIENT_ID = "229311372977-v1qgul890f3q3ii46hrdeb7gec7et90k.apps.googleusercontent.com";

function GoogleLoginButton({ onLogin }) {
  useEffect(() => {
    /* global google */
    if (window.google && !window.google.accounts.oauth2) {
      window.google.accounts.oauth2 = {
        hasRendered: false,
      };
    }

    if (window.google && !window.google.accounts.oauth2.hasRendered) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: onLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("g-signin"),
        { theme: "outline", size: "large" }
      );
      window.google.accounts.oauth2.hasRendered = true;
    }
  }, [onLogin]);

  // Add a function to trigger the OAuth flow for access token
  const handleGetAccessToken = () => {
    /* global google */
    google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope:
        "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly",
      callback: (tokenResponse) => {
        // This will have the access_token
        if (tokenResponse && tokenResponse.access_token) {
          onLogin({ access_token: tokenResponse.access_token });
        }
      },
    }).requestAccessToken();
  };

  return (
    <div>
      <div id="g-signin"></div>
      <button onClick={handleGetAccessToken} style={{ marginTop: 16 }}>
        Fetch Google Classroom Courses
      </button>
    </div>
  );
}

export default GoogleLoginButton;