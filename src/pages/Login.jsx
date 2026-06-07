import React, { useState } from "react";
import "../App.css"; // For consistent theme variables
import "./Login.css";

export default function Login({ setIsLoggedIn, setUserData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userMode, setUserMode] = useState("user");
  const [area, setArea] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const credentials = {
    Ekta: "Ekta100110",
    Dev: "Dev100110",
    Gaurav: "Gaurav100110",
    Gourav: "Gourav100110",
    Ariza: "Ariza100110",
    Vanshika: "Vanshika123",
    Mridul: "Mridul123",
    Paridhi: "Paridhi123",
    Aman: "Aman123",
    Varun: "Varun123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (credentials[username] && credentials[username] === password) {
      localStorage.setItem("username", username);
      localStorage.setItem("userMode", userMode);
      if (userMode === "authority") {
        localStorage.setItem("area", area);
        localStorage.setItem("position", position);
      } else {
        localStorage.removeItem("area");
        localStorage.removeItem("position");
      }

      setUserData({
        username,
        userMode,
        area: userMode === "authority" ? area : "",
        position: userMode === "authority" ? position : "",
      });
      setIsLoggedIn(true);
    } else {
      setError("❌ Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-glass">
        <h1 className="login-title">Smart Traffic Management System</h1>
        <p className="login-subtitle">Sign in to continue</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>User Mode</label>
            <select
              value={userMode}
              onChange={(e) => setUserMode(e.target.value)}
              className="input-field"
            >
              <option value="user">User</option>
              <option value="authority">Authority</option>
            </select>
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {userMode === "authority" && (
            <>
              <div className="input-group">
                <label>Area</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select Area</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Noida">Noida</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Faridabad">Faridabad</option>
                </select>
              </div>

              <div className="input-group">
                <label>Position</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select Position</option>
                  <option value="Traffic Inspector">Traffic Inspector</option>
                  <option value="Signal Operator">Signal Operator</option>
                  <option value="Control Room Officer">Control Room Officer</option>
                  <option value="Watch Guard">Watch Guard</option>
                </select>
              </div>
            </>
          )}

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
