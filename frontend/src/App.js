import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminOverview from "./pages/AdminOverview";
import ProtectedRoute from "./components/ProtectedRoute";

/* 🔥 Layout Component (Background Controller) */
function Layout() {
  const location = useLocation();

  const getPageClass = () => {
    if (location.pathname === "/signup") return "signup-bg";
    if (location.pathname === "/login") return "login-bg";
    return "";
  };

  return (
    <div className={getPageClass()}>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Client Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="client">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminOverview />
            </ProtectedRoute>
          }
        />

        {/* Catch All Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

/* 🔥 Main App */
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
