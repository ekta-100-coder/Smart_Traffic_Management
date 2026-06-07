// src/pages/Settings.jsx
import React, { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Settings() {
  const { language, setLanguage } = useContext(LanguageContext);

  // New settings state
  const [location, setLocation] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: "", phone: "", position: "" }]);
  const [notificationTypes, setNotificationTypes] = useState({
    emergencyAlerts: true,
    routeSuggestions: true,
    weeklySummary: false,
  });

  const texts = {
    en: {
      settingsDesc: "Customize display, language, and notification preferences.",
      language: "Language",
      languageDesc: "Select preferred language for display",
      english: "English",
      hindi: "Hindi",
      notifications: "Notifications",
      notificationDesc: "Push notifications and alert types",
      emergencyAlerts: "Emergency alerts",
      routeSuggestions: "Route suggestions",
      weeklySummary: "Weekly summary",
      location: "Location Preferences",
      locationDesc: "Set default city/area for alerts",
      userMode: "User Mode",
      authority: "Authority / Police",
      general: "General User",
      emergencyContacts: "Emergency Contacts",
      emergencyContactsDesc: "Add or update emergency contacts",
      addContact: "Add Contact",
      name: "Name",
      phone: "Phone",
      position: "Position/Role",
      remove: "Remove",
    },
    hi: {
      settingsDesc: "डिस्प्ले, भाषा और नोटिफिकेशन प्राथमिकताएं कस्टमाइज़ करें।",
      language: "भाषा",
      languageDesc: "डिस्प्ले के लिए पसंदीदा भाषा चुनें",
      english: "English",
      hindi: "हिन्दी",
      notifications: "नोटिफिकेशन",
      notificationDesc: "पुश नोटिफिकेशन और अलर्ट प्रकार",
      emergencyAlerts: "आपातकालीन अलर्ट",
      routeSuggestions: "रूट सुझाव",
      weeklySummary: "साप्ताहिक सारांश",
      location: "स्थान प्राथमिकताएँ",
      locationDesc: "अलर्ट के लिए डिफ़ॉल्ट शहर/क्षेत्र सेट करें",
      userMode: "यूज़र मोड",
      authority: "अथॉरिटी / पुलिस",
      general: "सामान्य यूज़र",
      emergencyContacts: "आपातकालीन संपर्क",
      emergencyContactsDesc: "आपातकालीन संपर्क जोड़ें या अपडेट करें",
      addContact: "संपर्क जोड़ें",
      name: "नाम",
      phone: "फ़ोन",
      position: "पद / भूमिका",
      remove: "हटाएं",
    },
  };

  const t = texts[language];

  const handleNotificationChange = (type) => {
    setNotificationTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleAddContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: "", phone: "", position: "" }]);
  };

  const handleContactChange = (index, field, value) => {
    const updated = [...emergencyContacts];
    updated[index][field] = value;
    setEmergencyContacts(updated);
  };

  const handleRemoveContact = (index) => {
    const updated = [...emergencyContacts];
    updated.splice(index, 1);
    setEmergencyContacts(updated);
  };

  return (
    <div
      className="page-container"
      style={{ backgroundColor: "#0f172a", minHeight: "100vh", padding: "2rem", color: "white" }}
    >
      {/* Heading */}
      <div
        style={{
          backgroundColor: "#1e293b",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "20px",
          border: "1.5px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 10px rgba(255,255,255,0.12), inset 0 0 6px rgba(255,255,255,0.06)",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "white",
            textShadow: "0 0 8px rgba(255,255,255,0.3)",
            margin: 0,
          }}
        >
          ⚙️ {language === "hi" ? "सेटिंग्स" : "Settings"}
        </h2>
        <div style={{ color: "#cbd5e1", marginTop: "6px", fontSize: "1rem" }}>{t.settingsDesc}</div>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 14,
        }}
      >
        {/* Language Card */}
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(255,255,255,0.12), inset 0 0 6px rgba(255,255,255,0.06)",
            border: "1.5px solid rgba(255,255,255,0.12)",
          }}
        >
          <h3 style={{ marginTop: 0, color: "white" }}>{t.language}</h3>
          <div style={{ color: "#cbd5e1", marginBottom: 12 }}>{t.languageDesc}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setLanguage("en")}
              style={{
                backgroundColor: language === "en" ? "#f1f5f9" : "transparent",
                color: language === "en" ? "#1e293b" : "white",
                border: language === "en" ? "none" : "1px solid rgba(255,255,255,0.3)",
                padding: "6px 12px",
                borderRadius: 6,
              }}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("hi")}
              style={{
                backgroundColor: language === "hi" ? "#f1f5f9" : "transparent",
                color: language === "hi" ? "#1e293b" : "white",
                border: language === "hi" ? "none" : "1px solid rgba(255,255,255,0.3)",
                padding: "6px 12px",
                borderRadius: 6,
              }}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Notifications Card */}
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(255,255,255,0.12), inset 0 0 6px rgba(255,255,255,0.06)",
            border: "1.5px solid rgba(255,255,255,0.12)",
          }}
        >
          <h3 style={{ marginTop: 0, color: "white" }}>{t.notifications}</h3>
          <div style={{ color: "#cbd5e1", marginBottom: 12 }}>{t.notificationDesc}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label>
              <input
                type="checkbox"
                checked={notificationTypes.emergencyAlerts}
                onChange={() => handleNotificationChange("emergencyAlerts")}
              />{" "}
              {t.emergencyAlerts}
            </label>
            <label>
              <input
                type="checkbox"
                checked={notificationTypes.routeSuggestions}
                onChange={() => handleNotificationChange("routeSuggestions")}
              />{" "}
              {t.routeSuggestions}
            </label>
            <label>
              <input
                type="checkbox"
                checked={notificationTypes.weeklySummary}
                onChange={() => handleNotificationChange("weeklySummary")}
              />{" "}
              {t.weeklySummary}
            </label>
          </div>
        </div>

        {/* Location Card */}
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(255,255,255,0.12), inset 0 0 6px rgba(255,255,255,0.06)",
            border: "1.5px solid rgba(255,255,255,0.12)",
          }}
        >
          <h3 style={{ marginTop: 0, color: "white" }}>{t.location}</h3>
          <div style={{ color: "#cbd5e1", marginBottom: 12 }}>{t.locationDesc}</div>
          <input
            type="text"
            placeholder={t.location}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "#0f172a",
              color: "white",
              width: "100%",
            }}
          />
        </div>

        {/* Emergency Contacts Card */}
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(255,255,255,0.12), inset 0 0 6px rgba(255,255,255,0.06)",
            border: "1.5px solid rgba(255,255,255,0.12)",
            overflow: "hidden",
          }}
        >
          <h3 style={{ marginTop: 0, color: "white" }}>{t.emergencyContacts}</h3>
          <div style={{ color: "#cbd5e1", marginBottom: 12 }}>{t.emergencyContactsDesc}</div>

          {emergencyContacts.map((c, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder={t.name}
                value={c.name}
                onChange={(e) => handleContactChange(idx, "name", e.target.value)}
                style={{
                  flex: 1.5,
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "#0f172a",
                  color: "white",
                  minWidth: "150px",
                }}
              />
              <input
                type="text"
                placeholder={t.phone}
                value={c.phone}
                onChange={(e) => handleContactChange(idx, "phone", e.target.value)}
                style={{
                  flex: 1,
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "#0f172a",
                  color: "white",
                  minWidth: "120px",
                }}
              />
              <input
                type="text"
                placeholder={t.position}
                value={c.position}
                onChange={(e) => handleContactChange(idx, "position", e.target.value)}
                style={{
                  flex: 1,
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "#0f172a",
                  color: "white",
                  minWidth: "120px",
                }}
              />
              <div style={{ position: "relative" }}>
                <button
                  style={{ background: "transparent", border: "none", color: "white", fontSize: 20, cursor: "pointer" }}
                  onClick={() => document.getElementById(`menu-${idx}`).classList.toggle("hidden")}
                >
                  ⋮
                </button>
                <div
                  id={`menu-${idx}`}
                  className="hidden"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 6,
                    padding: 6,
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={() => handleRemoveContact(idx)}
                    style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
                  >
                    {t.remove}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddContact}
            style={{
              marginTop: 8,
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: 6,
              padding: "8px 12px",
              cursor: "pointer",
              color: "white",
            }}
          >
            {t.addContact}
          </button>
        </div>
      </div>
    </div>
  );
}
