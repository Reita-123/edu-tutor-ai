import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("Demo Student");
  const [email, setEmail] = useState("demo@student.edu");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    setMessage("Profile updated! (Demo only)");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2>👤 Profile</h2>
      {message && (
        <div
          style={{
            background: "#e6ffe7",
            padding: 10,
            borderRadius: 6,
            color: "#197a00",
            marginBottom: 14,
            maxWidth: 350,
          }}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSave} style={{ maxWidth: 350 }}>
        <div style={{ marginBottom: 18 }}>
          <label>
            Name:
            <input
              style={{
                width: "100%",
                marginTop: 5,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #b5b5e0",
                background: editing ? "#f7f9ff" : "#f0f0f0",
              }}
              value={name}
              disabled={!editing}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>
            Email:
            <input
              style={{
                width: "100%",
                marginTop: 5,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #b5b5e0",
                background: editing ? "#f7f9ff" : "#f0f0f0",
              }}
              value={email}
              disabled={!editing}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          {editing ? (
            <>
              <button type="submit" style={{ marginRight: 10 }}>
                Save
              </button>
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;