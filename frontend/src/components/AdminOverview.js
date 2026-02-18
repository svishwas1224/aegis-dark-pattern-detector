import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in as admin first");
      return;
    }

    axios.get("http://localhost:5000/admin/overview", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setData(res.data))
    .catch(err => console.error("Error fetching admin overview:", err));
  }, []);

  return (
    <div>
      <h1>Admin Overview</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading admin overview...</p>
      )}
    </div>
  );
}

export default AdminOverview;