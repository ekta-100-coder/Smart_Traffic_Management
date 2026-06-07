import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProfileDropdown from "./components/ProfileDropdown";

import Dashboard from "./pages/Dashboard";
import RouteSuggestions from "./pages/RouteSuggestions";
import SignalControl from "./pages/SignalControl";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Emergency from "./pages/Emergency";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import FuturePredictions from "./pages/FuturePredictions"; // ✅ new page

import { LanguageContext } from "./context/LanguageContext"; 
import "./App.css";

export default function App() {
  const [traffic, setTraffic] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("username"));
  const [userData, setUserData] = useState({
    username: localStorage.getItem("username") || "",
    userMode: localStorage.getItem("userMode") || "user",
    area: localStorage.getItem("area") || "",
    position: localStorage.getItem("position") || "",
  });

  const [language, setLanguage] = useState("en");

  const fetchTraffic = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/traffic");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      if (Array.isArray(data)) setTraffic(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error("Backend error:", err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchTraffic();
    const id = setInterval(fetchTraffic, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserData({ username: "", userMode: "user", area: "", position: "" });
  };

  if (!isLoggedIn) {
    return (
      <Router>
        <div className="app">
          <main style={{ margin: "0 auto", padding: 24 }}>
            <Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
          </main>
        </div>
      </Router>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        <div className="app-container app">
          <Sidebar userMode={userData.userMode} />

          <div className="main-content">
            <div
              className="app-header"
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                background: "#0f172a",
                color: "#fff",
                padding: "16px 24px",
                borderRadius: "12px",
                margin: "16px 24px 8px 24px",
                display: "flex",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "700", color: "#fff" }}>
                  🚦 Smart Traffic Management System
                </h1>
                {userData.userMode === "authority" && (
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "#e2e8f0",
                      background: "#1e293b",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {userData.area} — {userData.position}
                  </span>
                )}
              </div>

              <ProfileDropdown userData={userData} onLogout={handleLogout} />
            </div>

            <div className="page-container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/routes" element={<RouteSuggestions />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />

                {userData.userMode === "authority" && (
                  <>
                    <Route path="/signal-control" element={<SignalControl />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                  </>
                )}

                {/* ✅ Future Predictions */}
                <Route path="/future-predictions" element={<FuturePredictions />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            <footer className="footer" style={{ padding: "12px 24px" }}>
              <div className="muted">
                Last updated: {lastUpdated || "Fetching data..."}
              </div>
            </footer>
          </div>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}
