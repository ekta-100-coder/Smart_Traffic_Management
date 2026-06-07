import React from "react";

/**
 * Navbar - shows title and simple theme hint
 */
export default function Navbar({ theme, setTheme }) {
  // reading window-level theme if not passed
  const curTheme = theme ?? window.__APP_THEME ?? "light";

  return (
    <header className="navbar" role="banner">
      <div className="app-title">AI Traffic Management & Emergency Alert</div>

      <div className="theme-indicator">
        <div style={{ fontSize:14, fontWeight:700, marginRight:6 }}>
          {curTheme === "dark" ? "Night" : "Day"}
        </div>
        {/* Note: Settings page has full toggle; this is just indicator */}
      </div>
    </header>
  );
}
