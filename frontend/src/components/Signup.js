import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/auth/signup", {
        username,
        password,
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Error signing up");
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Signup Page</h1>

      <form onSubmit={handleSignup}>
        {/* Username */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        {/* Password */}
        <div
          style={{
            position: "relative",
            marginBottom: "10px",
            width: "250px",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "8px 35px 8px 8px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />

          <span
            onClick={togglePassword}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
