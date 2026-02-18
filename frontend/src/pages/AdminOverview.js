import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/admin/overview", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setData(res.data))
    .catch(err => console.error("Admin error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Overview</h1>
      {data ? (
        <div style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          maxWidth: "400px",
          backgroundColor: "#f9f9f9"
        }}>
          <h2>Message</h2>
          <p>{data.message}</p>
          <h2>Data</h2>
          <p>{data.data}</p>
        </div>
      ) : (
        <p>Loading admin data...</p>
      )}
    </div>
  );
}

export default AdminOverview;