// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Map,
  TrafficCone,
  Bell,
  Settings,
  AlertTriangle,
  ShieldCheck, // new icon for Admin Dashboard
  Clock,       // new icon for Future Predictions
} from "lucide-react";

export default function Sidebar({ userMode }) {
  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/analytics", label: "Analytics", icon: <Activity size={20} /> },
    { path: "/routes", label: "Route Suggestions", icon: <Map size={20} /> },

    // Authority-only items
    ...(userMode === "authority"
      ? [
          {
            path: "/signal-control",
            label: "Signal Control",
            icon: <TrafficCone size={20} />,
          },
          {
            path: "/admin",
            label: "Admin Dashboard",
            icon: <ShieldCheck size={20} />,
          },
        ]
      : []),

    { path: "/emergency", label: "Emergency", icon: <AlertTriangle size={20} /> },
    { path: "/notifications", label: "Notifications", icon: <Bell size={20} /> },

    // New Future Predictions link
    { path: "/future-predictions", label: "Future Predictions", icon: <Clock size={20} /> },

    { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const sidebarStyle = {
    width: "230px",
    backgroundColor: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: "16px",
    position: "fixed",
    left: 0,
    top: 0,
  };

  const headerStyle = {
    fontSize: "1.3rem",
    fontWeight: 600,
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "#cbd5e1",
    padding: "10px 12px",
    borderRadius: "8px",
    transition: "background 0.2s ease, color 0.2s ease",
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: "#2563eb",
    color: "white",
  };

  return (
    <aside style={sidebarStyle}>
      <div style={headerStyle}>
        🚦 <span>Smart Traffic</span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            end
          >
            {item.icon}
            <span style={{ fontSize: "15px" }}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
