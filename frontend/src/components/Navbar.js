import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {!token && <Link to="/signup">Signup</Link>}
      {!token && <Link to="/login">Login</Link>}
      {token && role === "client" && <Link to="/dashboard">Dashboard</Link>}
      {token && role === "admin" && <Link to="/admin">Admin</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;