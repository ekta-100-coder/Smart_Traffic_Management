// src/pages/Emergency.jsx
import React, { useState, useContext, useEffect } from "react";
import {
  Ambulance,
  Flame,
  ShieldAlert,
  Car,
  AlertTriangle,
  X,
  Crown,
} from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

export default function Emergency() {
  const { language } = useContext(LanguageContext);

  const text = {
    en: {
      pageTitle: "🚨 Emergency Alerts",
      addButton: "+ Generate Emergency Alert",
      formTitle: "Create New Alert",
      typeLabel: "🚨 Type of Emergency:",
      locationLabel: "📍 Location of Emergency:",
      routeLabel: "🛣️ Route for Vehicles:",
      noteLabel: "📝 Additional Notes:",
      selectType: "Select Type",
      accident: "🚗 Accident",
      medical: "💉 Medical",
      fire: "🔥 Fire",
      police: "🚓 Police",
      vip: "👑 VIP Movement",
      sendAlert: "Send Alert 🚨",
      alertSuccess: "🚨 Alert sent to authorities successfully!",
      justNow: "Just now",
    },
    hi: {
      pageTitle: "🚨 आपातकालीन सूचनाएं",
      addButton: "+ आपातकालीन अलर्ट बनाएं",
      formTitle: "नया अलर्ट बनाएं",
      typeLabel: "🚨 आपातकालीन प्रकार:",
      locationLabel: "📍 आपातकालीन स्थान:",
      routeLabel: "🛣️ वाहन मार्ग:",
      noteLabel: "📝 अतिरिक्त टिप्पणी:",
      selectType: "प्रकार चुनें",
      accident: "🚗 दुर्घटना",
      medical: "💉 चिकित्सा",
      fire: "🔥 आग",
      police: "🚓 पुलिस",
      vip: "👑 वीआईपी मूवमेंट",
      sendAlert: "अलर्ट भेजें 🚨",
      alertSuccess: "🚨 अलर्ट अधिकारियों को सफलतापूर्वक भेजा गया!",
      justNow: "अभी",
    },
  };

  const t = text[language];

  const baseAlerts = [
    {
      id: 1,
      type: "Ambulance",
      details:
        "Emergency vehicle detected near Sector 18. Clearing route automatically.",
      time: "Just now",
    },
    {
      id: 2,
      type: "Fire",
      details: "Fire reported near Raj Nagar. Traffic rerouted from affected area.",
      time: "10 min ago",
    },
    {
      id: 3,
      type: "Police",
      details: "VIP movement on NH9. Temporary traffic hold for 3 mins.",
      time: "20 min ago",
    },
  ];

  const alertTranslations = {
    en: {
      Ambulance: "🚑 Ambulance Route",
      Fire: "🔥 Fire Alert",
      Police: "🚓 Police Escort",
      VIP: "👑 VIP Movement",
      Accident: "🚗 Accident Alert",
      Medical: "💉 Medical Emergency",
    },
    hi: {
      Ambulance: "🚑 एम्बुलेंस मार्ग",
      Fire: "🔥 अग्नि अलर्ट",
      Police: "🚓 पुलिस एस्कॉर्ट",
      VIP: "👑 वीआईपी मूवमेंट",
      Accident: "🚗 दुर्घटना अलर्ट",
      Medical: "💉 चिकित्सा आपातकाल",
    },
  };

  const detailTranslations = {
    en: (alert) => alert.details,
    hi: (alert) => {
      if (alert.type === "Ambulance")
        return "Sector 18 के पास आपातकालीन वाहन देखा गया। मार्ग स्वतः साफ किया गया।";
      if (alert.type === "Fire")
        return "राज नगर के पास आग की सूचना मिली। प्रभावित क्षेत्र से यातायात बदल दिया गया।";
      if (alert.type === "Police")
        return "NH9 पर पुलिस एस्कॉर्ट चालू है। कुछ देर के लिए ट्रैफिक रोका गया।";
      if (alert.type === "VIP")
        return "NH9 पर वीआईपी मूवमेंट चल रहा है। ट्रैफिक नियंत्रित किया जा रहा है।";
      if (alert.type === "Accident")
        return `घटना हुई स्थान ${alert.location}. एम्बुलेंस मार्ग: ${alert.vehicleRoute || "-"}`;
      if (alert.type === "Medical")
        return `चिकित्सा आपातकालीन स्थान ${alert.location}. एम्बुलेंस मार्ग: ${alert.vehicleRoute || "-"}`;
      return alert.details;
    },
  };

  const [alerts, setAlerts] = useState(baseAlerts);
  const [formVisible, setFormVisible] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: "",
    location: "",
    vehicleRoute: "",
    note: "",
  });

  const icons = {
    Ambulance: <Ambulance size={22} color="#ff5252" />,
    Fire: <Flame size={22} color="#ff6f00" />,
    Police: <ShieldAlert size={22} color="#2979ff" />,
    VIP: <Crown size={22} color="#ffd700" />,
    Accident: (
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Car size={22} color="#ff5252" />
        <AlertTriangle
          size={12}
          color="#ffcc33"
          style={{ position: "absolute", top: -6, right: -6 }}
        />
      </div>
    ),
    Medical: <Ambulance size={22} color="#ff5252" />,
  };

  useEffect(() => {
    setAlerts((prev) =>
      prev.map((alert) => ({
        ...alert,
        type: alertTranslations[language][alert.type] || alert.type,
        details: detailTranslations[language](alert),
        time: alert.time === "Just now" ? t.justNow : alert.time,
      }))
    );
  }, [language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const typeKey = newAlert.type;
    const alertType = alertTranslations[language][typeKey] || typeKey;

    let details = "";
    if (language === "hi") {
      if (typeKey === "Accident")
        details = `घटना हुई स्थान ${newAlert.location}. एम्बुलेंस मार्ग: ${newAlert.vehicleRoute}`;
      else if (typeKey === "Medical")
        details = `चिकित्सा आपातकालीन स्थान ${newAlert.location}. एम्बुलेंस मार्ग: ${newAlert.vehicleRoute}`;
      else if (typeKey === "Fire")
        details = `अग्नि की सूचना मिली स्थान ${newAlert.location}. आस-पास के रास्ते साफ किए गए।`;
      else if (typeKey === "VIP")
        details = `वीआईपी मूवमेंट ${newAlert.location} पर। मार्ग: ${newAlert.vehicleRoute}`;
      else
        details = `पुलिस को बुलाया गया स्थान ${newAlert.location}. मार्ग: ${newAlert.vehicleRoute}`;
    } else {
      if (typeKey === "Accident")
        details = `Accident reported at ${newAlert.location}. Ambulance via ${newAlert.vehicleRoute}.`;
      else if (typeKey === "Medical")
        details = `Medical emergency at ${newAlert.location}. Route: ${newAlert.vehicleRoute}.`;
      else if (typeKey === "Fire")
        details = `Fire reported at ${newAlert.location}. Roads cleared.`;
      else if (typeKey === "VIP")
        details = `VIP movement near ${newAlert.location}. Using route: ${newAlert.vehicleRoute}.`;
      else
        details = `Police needed at ${newAlert.location}. Route: ${newAlert.vehicleRoute}.`;
    }

    const newEntry = {
      id: alerts.length + 1,
      type: alertType,
      details: `${details} ${newAlert.note ? "📝 " + newAlert.note : ""}`,
      time: t.justNow,
    };

    setAlerts([newEntry, ...alerts]);
    setNewAlert({ type: "", location: "", vehicleRoute: "", note: "" });
    setFormVisible(false);
    alert(t.alertSuccess);
  };

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
          color: "#e53935",
          textShadow: "0 0 8px rgba(229, 57, 53, 0.4)",
        }}
      >
        {t.pageTitle}
      </h2>

      <button
        onClick={() => setFormVisible(true)}
        style={{
          background: "#e53935",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          marginBottom: "25px",
          boxShadow: "0 0 10px rgba(229, 57, 53, 0.4)",
        }}
      >
        {t.addButton}
      </button>

      {formVisible && (
        <div
          style={{
            background: "#0b0b0b",
            padding: "25px",
            borderRadius: "12px",
            color: "white",
            boxShadow: "0 0 12px rgba(229,57,53,0.4)",
            marginBottom: "30px",
            position: "relative",
          }}
        >
          <button
            onClick={() => setFormVisible(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              color: "#ff5252",
              cursor: "pointer",
            }}
          >
            <X size={22} />
          </button>

          <h3 style={{ marginBottom: "15px", color: "#ff5252" }}>
            {t.formTitle}
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            {/* Emergency Type */}
            <label>
              <span style={{ fontWeight: "600" }}>{t.typeLabel}</span>
              <select
                value={newAlert.type}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, type: e.target.value })
                }
                required
                style={{
                  width: "100%",
                  marginTop: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  background: "#1a1a1a",
                  color: "#fff",
                }}
              >
                <option value="">{t.selectType}</option>
                <option value="Accident">{t.accident}</option>
                <option value="Medical">{t.medical}</option>
                <option value="Fire">{t.fire}</option>
                <option value="Police">{t.police}</option>
                <option value="VIP">{t.vip}</option>
              </select>
            </label>

            {/* Location */}
            <label>
              <span style={{ fontWeight: "600" }}>{t.locationLabel}</span>
              <input
                type="text"
                value={newAlert.location}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, location: e.target.value })
                }
                placeholder={
                  language === "hi"
                    ? "जगह दर्ज करें (उदा. राज नगर, सेक्टर 62)"
                    : "Enter location (e.g., Raj Nagar, Sector 62)"
                }
                required
                style={{
                  width: "100%",
                  marginTop: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  background: "#1a1a1a",
                  color: "#fff",
                }}
              />
            </label>

            {/* Vehicle Route */}
            <label>
              <span style={{ fontWeight: "600" }}>{t.routeLabel}</span>
              <input
                type="text"
                value={newAlert.vehicleRoute}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, vehicleRoute: e.target.value })
                }
                placeholder={
                  language === "hi"
                    ? "उदा: Route 32 → NH9 → Sector 18"
                    : "Example: Route 32 → NH9 → Sector 18"
                }
                required
                style={{
                  width: "100%",
                  marginTop: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  background: "#1a1a1a",
                  color: "#fff",
                }}
              />
            </label>

            {/* Notes */}
            <label>
              <span style={{ fontWeight: "600" }}>{t.noteLabel}</span>
              <textarea
                value={newAlert.note}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, note: e.target.value })
                }
                rows="3"
                maxLength="200"
                placeholder={
                  language === "hi"
                    ? "यहां संक्षिप्त टिप्पणी लिखें (अधिकतम 3 पंक्तियाँ)"
                    : "Write a short note here (max 3 lines)"
                }
                style={{
                  width: "100%",
                  marginTop: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  background: "#1a1a1a",
                  color: "#fff",
                  resize: "none",
                }}
              />
            </label>

            <button
              type="submit"
              style={{
                background: "#ff5252",
                border: "none",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {t.sendAlert}
            </button>
          </form>
        </div>
      )}

      {/* Alert List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              background: "#0b0b0b",
              border: "1px solid rgba(229, 57, 53, 0.25)",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(229, 57, 53, 0.2)",
              transition: "all 0.3s ease",
              color: "#f8f8f8",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 18px rgba(229, 57, 53, 0.45)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 10px rgba(229, 57, 53, 0.2)")
            }
          >
            <h3
              style={{ fontSize: "1.1rem", marginBottom: "6px", color: "#ff5252" }}
            >
              {alert.type}
            </h3>
            <p style={{ fontSize: "1rem", marginBottom: "6px" }}>{alert.details}</p>
            <span style={{ fontSize: "0.85rem", color: "#aaa" }}>{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
