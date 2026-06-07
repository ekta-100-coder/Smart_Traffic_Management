import React, { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function AdminDashboard() {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      pageTitle: "🚦 Smart Traffic Management System",
      officersTitle: "🧑‍✈️ Officers in Area",
      activeAlerts: "🚨 Active Emergency Alerts",
      adminPanel: "🛠️ Admin Control Panel",
      attendNow: "Attend Now",
      selectEmergency: "Select an unattended emergency to manage.",
      uploadProof: "Upload proof for",
      submitMark: "✅ Submit Proof & Mark Attended",
      officerRoles: {
        traffic: "Traffic Head",
        emergency: "Emergency Lead",
        control: "Control Room",
      },
      emergencyTypes: {
        accident: "Accident",
        fire: "Fire",
        medical: "Medical",
      },
      emergencyStatus: {
        attended: "Attended",
        unattended: "Unattended",
      },
    },
    hi: {
      pageTitle: "🚦 स्मार्ट ट्रैफिक प्रबंधन प्रणाली",
      officersTitle: "🧑‍✈️ क्षेत्र के अधिकारी",
      activeAlerts: "🚨 सक्रिय आपातकालीन अलर्ट",
      adminPanel: "🛠️ प्रशासन नियंत्रण पैनल",
      attendNow: "अभी देखें",
      selectEmergency: "प्रबंधित करने के लिए किसी अनदेखे आपातकालीन को चुनें।",
      uploadProof: "के लिए प्रमाण अपलोड करें",
      submitMark: "✅ प्रमाण सबमिट करें और पूरी तरह देखें",
      officerRoles: {
        traffic: "ट्रैफिक हेड",
        emergency: "आपातकालीन लीड",
        control: "कंट्रोल रूम",
      },
      emergencyTypes: {
        accident: "दुर्घटना",
        fire: "आग",
        medical: "चिकित्सा",
      },
      emergencyStatus: {
        attended: "देखा गया",
        unattended: "अनदेखा",
      },
    },
  };

  const t = translations[language];

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [proofFile, setProofFile] = useState(null);

  const officers = [
    { name: { en: "Rajesh Kumar", hi: "राजेश कुमार" }, role: "traffic", phone: "9876543210" },
    { name: { en: "Anita Singh", hi: "अनीता सिंह" }, role: "emergency", phone: "9123456789" },
    { name: { en: "Vikram Yadav", hi: "विक्रम यादव" }, role: "control", phone: "9001122334" },
  ];

  const emergencies = [
    {
      id: 1,
      type: "accident",
      location: { en: "NH24, Ghaziabad", hi: "एनएच24, गाजियाबाद" },
      status: "unattended",
      contact: { en: "Rajesh Kumar", hi: "राजेश कुमार" },
    },
    {
      id: 2,
      type: "fire",
      location: { en: "Vaishali Sector 4", hi: "वैशाली सेक्टर 4" },
      status: "unattended",
      contact: { en: "Anita Singh", hi: "अनीता सिंह" },
    },
    {
      id: 3,
      type: "medical",
      location: { en: "Indirapuram", hi: "इंदिरापुरम" },
      status: "attended",
      contact: { en: "Vikram Yadav", hi: "विक्रम यादव" },
    },
  ];

  const handleProofUpload = (e) => setProofFile(e.target.files[0]);

  const handleMarkAttended = () => {
    alert(`${t.submitMark} ✅`);
    setSelectedAlert(null);
    setProofFile(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "20px 40px",
      }}
    >
      {/* Heading */}
      <div
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: "14px 22px",
          borderRadius: "10px",
          marginBottom: "25px",
          boxShadow: "0 0 10px rgba(0,188,212,0.25)",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", margin: 0 }}>
          {t.pageTitle}
        </h1>
      </div>

      {/* 3-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1.2fr 1.3fr",
          gap: "20px",
          width: "100%",
          height: "calc(100vh - 160px)",
        }}
      >
        {/* Column 1: Officers */}
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            borderRadius: "10px",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            border: "1.5px solid #475569",
            boxShadow:
              "0 0 10px rgba(0,188,212,0.25), inset 0 0 10px rgba(0,188,212,0.1)",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "5px" }}>
            {t.officersTitle}
          </h2>
          {officers.map((o, i) => (
            <div
              key={i}
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "10px 14px",
                lineHeight: "1.5",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <strong>{o.name[language]}</strong>
              <br />
              <span style={{ color: "#cbd5e1" }}>{t.officerRoles[o.role]}</span>
              <br />
              📞 {o.phone}
            </div>
          ))}
        </div>

        {/* Column 2: Active Alerts */}
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            borderRadius: "10px",
            padding: "18px",
            overflowY: "auto",
            border: "1.5px solid #475569",
            boxShadow:
              "0 0 10px rgba(0,188,212,0.25), inset 0 0 10px rgba(0,188,212,0.1)",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "5px" }}>
            {t.activeAlerts}
          </h2>
          {emergencies.map((e) => (
            <div
              key={e.id}
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "10px 14px",
                marginBottom: "10px",
                backgroundColor:
                  e.status === "attended"
                    ? "rgba(34,197,94,0.1)"
                    : "rgba(248,113,113,0.1)",
              }}
            >
              <p>
                <strong>Type:</strong> {t.emergencyTypes[e.type]}
              </p>
              <p>
                <strong>Location:</strong> {e.location[language]}
              </p>
              <p>
                <strong>Contact:</strong> {e.contact[language]}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: e.status === "attended" ? "#22c55e" : "#f87171",
                    fontWeight: "600",
                  }}
                >
                  {t.emergencyStatus[e.status]}
                </span>
              </p>
              {e.status === "unattended" && (
                <button
                  onClick={() => setSelectedAlert(e)}
                  style={{
                    marginTop: "6px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {t.attendNow}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Column 3: Admin Control Panel */}
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            borderRadius: "10px",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            overflowY: "auto",
            border: "1.5px solid #475569",
            boxShadow:
              "0 0 10px rgba(0,188,212,0.25), inset 0 0 10px rgba(0,188,212,0.1)",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "10px" }}>
            {t.adminPanel}
          </h2>

          {selectedAlert ? (
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "14px",
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <p style={{ marginBottom: "8px" }}>
                {t.uploadProof} <strong>{t.emergencyTypes[selectedAlert.type]}</strong> at{" "}
                {selectedAlert.location[language]}
              </p>
              <input
                type="file"
                onChange={handleProofUpload}
                style={{ marginBottom: "10px", color: "white" }}
              />
              <button
                onClick={handleMarkAttended}
                style={{
                  backgroundColor: "#22c55e",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {t.submitMark}
              </button>
            </div>
          ) : (
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
              {t.selectEmergency}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
