// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext"; // adjust path

export default function Dashboard() {
  const { language } = useContext(LanguageContext);

  const [traffic, setTraffic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrafficData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/traffic");
      if (!res.ok) throw new Error("Backend not responding");
      const data = await res.json();
      if (Array.isArray(data)) setTraffic(data);
      else setTraffic([]);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("❌ Unable to connect to backend (port 5000)");
      setTraffic([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 900000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setLoading(true);
    fetchTrafficData();
  };

  const greenFlowPercent = traffic.length
    ? Math.round(
        (traffic.filter((t) => t.congestionLevel < 40).length / traffic.length) *
          100
      )
    : 0;

  const avgSpeed = traffic.length
    ? Math.round(
        traffic.reduce((acc, t) => acc + (t.avgSpeed || 0), 0) / traffic.length
      )
    : 0;

  const alerts = traffic.filter(
    (t) => t.status === "Accident" || t.emergencyRoute
  );

  // Texts for bilingual support
  const texts = {
    en: {
      overview: "Overview • Live Prototype (connected to backend)",
      trafficFlow: "Traffic Flow",
      avgSpeed: "Average Speed",
      signalHealth: "Signal Health",
      recentAlerts: "Recent Alerts",
      quickActions: "Quick Actions",
      refreshNow: "🔄 Refresh Now",
      openNotifications: "Open Notifications",
      noRecentAlerts: "No recent alerts",
      realTimeCongestion: "Real-time congestion levels",
      acrossActive: "Across active intersections",
      autoAdjust: "Auto-adjust active",
      autoRefresh: "Auto refresh every 15 minutes",
    },
    hi: {
      overview: "सारांश • लाइव प्रोटोटाइप (बैकेंड से जुड़ा हुआ)",
      trafficFlow: "यातायात प्रवाह",
      avgSpeed: "औसत गति",
      signalHealth: "सिग्नल स्वास्थ्य",
      recentAlerts: "हाल की सूचनाएँ",
      quickActions: "त्वरित क्रियाएँ",
      refreshNow: "🔄 अभी रीफ़्रेश करें",
      openNotifications: "सूचनाएँ खोलें",
      noRecentAlerts: "कोई हालिया सूचना नहीं",
      realTimeCongestion: "रीयल-टाइम जाम स्तर",
      acrossActive: "सक्रिय चौराहों में",
      autoAdjust: "ऑटो-एडजस्ट सक्रिय",
      autoRefresh: "हर 15 मिनट में ऑटो रीफ़्रेश",
    },
  };

  const t = texts[language];

  return (
    <div>
      <div className="page-title">{t.overview}</div>

      {error && (
        <div style={{ color: "red", marginBottom: 10, fontWeight: 500 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div>Loading live traffic data...</div>
      ) : (
        <>
          {/* ✅ KPI Grid */}
          <div
            className="kpi-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <div
              className="card kpi-card"
              style={{
                backgroundColor: "#0f172a",
                color: "white",
                borderRadius: "14px",
                boxShadow:
                  "0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.3)",
                transition: "all 0.3s ease",
                padding: "16px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(59,130,246,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.3)")
              }
            >
              <div className="kpi-title">{t.trafficFlow}</div>
              <div className="kpi-value">
                {traffic.length ? `${greenFlowPercent}% Green` : "—"}
              </div>
              <div className="muted">{t.realTimeCongestion}</div>
            </div>

            <div
              className="card kpi-card"
              style={{
                backgroundColor: "#0f172a",
                color: "white",
                borderRadius: "14px",
                boxShadow:
                  "0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.3)",
                transition: "all 0.3s ease",
                padding: "16px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(59,130,246,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.3)")
              }
            >
              <div className="kpi-title">{t.avgSpeed}</div>
              <div className="kpi-value">
                {traffic.length ? `${avgSpeed} km/h` : "—"}
              </div>
              <div className="muted">{t.acrossActive}</div>
            </div>

            <div
              className="card kpi-card"
              style={{
                backgroundColor: "#0f172a",
                color: "white",
                borderRadius: "14px",
                boxShadow:
                  "0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.3)",
                transition: "all 0.3s ease",
                padding: "16px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(59,130,246,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.3)")
              }
            >
              <div className="kpi-title">{t.signalHealth}</div>
              <div className="kpi-value">{traffic.length} Signals</div>
              <div className="muted">{t.autoAdjust}</div>
            </div>
          </div>

          {/* ✅ Alerts & Quick Actions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: 16,
              marginTop: 18,
            }}
          >
            <div
              className="card"
              style={{
                backgroundColor: "#0f172a",
                color: "white",
                borderRadius: "14px",
                boxShadow:
                  "0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.3)",
                padding: "16px",
              }}
            >
              <h3 style={{ marginTop: 0 }}>{t.recentAlerts}</h3>
              {alerts.length === 0 ? (
                <div className="muted">{t.noRecentAlerts}</div>
              ) : (
                alerts.map((t, idx) => (
                  <div key={idx} className="alert-row">
                    <div className="alert-left">
                      <div
                        className={`badge ${
                          t.status === "Accident" ? "red" : "green"
                        }`}
                      ></div>
                    </div>
                    <div className="alert-mid">
                      <div style={{ fontWeight: 700 }}>
                        {t.status === "Accident" ? "Accident" : "Ambulance"}
                      </div>
                      <div className="alert-location">{t.location}</div>
                    </div>
                    <div className="alert-right muted">
                      {new Date(t.updatedAt || Date.now()).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div
              className="card"
              style={{
                backgroundColor: "#0f172a",
                color: "white",
                borderRadius: "14px",
                boxShadow:
                  "0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.3)",
                padding: "16px",
              }}
            >
              <h3 style={{ marginTop: 0 }}>{t.quickActions}</h3>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn btn-primary" onClick={handleManualRefresh}>
                  {t.refreshNow}
                </button>
                <button className="btn btn-ghost">{t.openNotifications}</button>
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                {t.autoRefresh}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
