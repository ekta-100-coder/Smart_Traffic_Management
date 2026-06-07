import React from "react";
import { Bell } from "lucide-react";

export default function Alerts() {
  const alerts = [
    { id: 1, text: "Ambulance on route near Connaught Place", level: "high" },
    { id: 2, text: "Minor accident at Raj Nagar — expect delays", level: "moderate" },
    { id: 3, text: "Heavy congestion at MG Road", level: "high" },
  ];

  return (
    <div className="page">
      <div className="page-header"><h2>Live Alerts</h2><p className="muted">Notifications & quick actions</p></div>

      <div className="alert-block">
        {alerts.map(a => (
          <div key={a.id} className="alert-item">
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Bell size={18} />
              <div>
                <div style={{ fontWeight: 700 }}>{a.text}</div>
                <div className={`alert-${a.level === "high" ? "red" : "yellow"}`}>Level: {a.level}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
