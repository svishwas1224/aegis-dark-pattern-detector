import React, { useState } from "react";
import { analyzePage } from "../services/api";

function ClientDashboard() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    try {
      const response = await analyzePage(url);
      setResults(response.data.patterns || []);
      setError("");
    } catch (err) {
      setError("Error analyzing page. Please try again.");
    }
  };

  return (
    <div>
      <h2>Client Dashboard</h2>
      <input
        type="text"
        placeholder="Enter page URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((pattern, index) => (
          <li key={index}>{pattern}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClientDashboard;