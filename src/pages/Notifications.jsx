import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Notifications() {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      heading: "📢 Live Notifications",
      notifications: [
        { id: 1, message: "🚨 Accident detected on NH24 near Sector 62. Rerouting active.", time: "2 min ago" },
        { id: 2, message: "🟢 Traffic flow normalized at Raj Nagar Extension.", time: "10 min ago" },
        { id: 3, message: "⚠️ Emergency route cleared for ambulance near Kaushambi.", time: "30 min ago" },
      ],
    },
    hi: {
      heading: "📢 लाइव नोटिफिकेशन",
      notifications: [
        { id: 1, message: "🚨 एनएच24, सेक्टर 62 के पास दुर्घटना दर्ज। पुनः मार्ग सक्रिय।", time: "2 मिनट पहले" },
        { id: 2, message: "🟢 राज नगर एक्सटेंशन में ट्रैफिक सामान्य हुआ।", time: "10 मिनट पहले" },
        { id: 3, message: "⚠️ कौशाम्बी के पास एम्बुलेंस के लिए आपातकालीन मार्ग साफ।", time: "30 मिनट पहले" },
      ],
    },
  };

  const t = translations[language];

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        color: "#111",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "700",
          marginBottom: "25px",
          color: "#00bcd4",
          textShadow: "0 0 8px rgba(0, 188, 212, 0.4)",
        }}
      >
        {t.heading}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {t.notifications.map((note) => (
          <div
            key={note.id}
            style={{
              background: "#0b0b0b",
              border: "1px solid rgba(0, 188, 212, 0.25)",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0, 188, 212, 0.2)",
              transition: "all 0.3s ease",
              color: "#f8f8f8",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 18px rgba(0, 188, 212, 0.45)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 188, 212, 0.2)")
            }
          >
            <p
              style={{
                fontSize: "1rem",
                marginBottom: "6px",
                fontWeight: "500",
              }}
            >
              {note.message}
            </p>
            <span style={{ fontSize: "0.85rem", color: "#aaa" }}>{note.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
