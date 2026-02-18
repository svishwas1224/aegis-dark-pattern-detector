import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/client/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data.profile))
    .catch(err => console.error("Dashboard error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Client Dashboard</h1>
      {profile ? (
        <div style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          maxWidth: "400px",
          backgroundColor: "#f9f9f9"
        }}>
          <h2>Profile</h2>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Dashboard;