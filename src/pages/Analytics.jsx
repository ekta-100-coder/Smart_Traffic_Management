// src/pages/Analytics.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import "../App.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { LanguageContext } from "../context/LanguageContext";

const COLORS = ["#00c853", "#ffcc33", "#ff5252", "#2196f3"];

function genInitialSeries() {
  const now = Date.now();
  return Array.from({ length: 12 }).map((_, i) => ({
    t: new Date(now - (11 - i) * 60 * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    v: Math.round(80 + Math.random() * 140),
  }));
}

export default function Analytics() {
  const { language } = useContext(LanguageContext);

  const text = {
    en: {
      pageTitle: "Analytics & Simulation",
      simulation: "Simulation",
      pause: "Pause",
      start: "Start",
      reset: "Reset",
      auto: "Auto",
      updateInfo: "Simulation updates every ~30 minutes",
      trafficVolume: "Traffic Volume (last 12 timestamps)",
      hotspots: "Hotspots (current)",
      trafficState: "Traffic State",
      bars: ["Connaught", "Raj Nagar", "Kaushambi"],
      pie: ["Moving", "Slow", "Stopped"],
    },
    hi: {
      pageTitle: "विश्लेषण और सिमुलेशन",
      simulation: "सिमुलेशन",
      pause: "रोकें",
      start: "शुरू करें",
      reset: "रीसेट",
      auto: "स्वचालित",
      updateInfo: "सिमुलेशन लगभग 30 मिनट में अपडेट होता है",
      trafficVolume: "यातायात मात्रा (पिछले 12 समयांक)",
      hotspots: "हॉटस्पॉट्स (वर्तमान)",
      trafficState: "यातायात स्थिति",
      bars: ["कनॉट प्लेस", "राज नगर", "कौशांबी"],
      pie: ["चल रहे", "धीरे", "रुके हुए"],
    },
  };

  const t = text[language];

  const [series, setSeries] = useState(genInitialSeries());
  const [bars, setBars] = useState([
    { name: t.bars[0], value: 120 },
    { name: t.bars[1], value: 80 },
    { name: t.bars[2], value: 50 },
  ]);
  const [pie, setPie] = useState([
    { name: t.pie[0], value: 60 },
    { name: t.pie[1], value: 30 },
    { name: t.pie[2], value: 10 },
  ]);
  const [running, setRunning] = useState(false);
  const [auto, setAuto] = useState(true);
  const timerRef = useRef(null);

  // Step function for simulation
  const step = () => {
    setSeries((prev) => {
      const nextVal = Math.max(
        20,
        Math.round(prev[prev.length - 1].v + (Math.random() * 40 - 20))
      );
      const nextT = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return [...prev.slice(-11), { t: nextT, v: nextVal }];
    });

    setBars((prev) =>
      prev.map((p) => ({
        ...p,
        value: Math.max(10, Math.round(p.value + (Math.random() * 40 - 20))),
      }))
    );

    setPie(() => {
      const moving = Math.max(10, Math.round(50 + (Math.random() * 20 - 10)));
      const slow = Math.max(5, Math.round(30 + (Math.random() * 10 - 5)));
      const stopped = Math.max(1, 100 - (moving + slow));
      return [
        { name: t.pie[0], value: moving },
        { name: t.pie[1], value: slow },
        { name: t.pie[2], value: stopped },
      ];
    });
  };

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(step, 1800000);
      return () => clearInterval(timerRef.current);
    }
    return () => {};
  }, [running]);

  useEffect(() => {
    if (auto) {
      setRunning(true);
    } else {
      setRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [auto]);

  // Update bars/pie names when language changes
  useEffect(() => {
    setBars((prev) =>
      prev.map((b, idx) => ({
        ...b,
        name: t.bars[idx] || b.name,
      }))
    );
    setPie((prev) =>
      prev.map((pItem, idx) => ({
        ...pItem,
        name: t.pie[idx] || pItem.name,
      }))
    );
  }, [language]);

  return (
    <div
      className="page-container analytics-page"
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "#f1f5f9",
        padding: "2rem",
      }}
    >
      {/* Page Title */}
      <h2
        className="page-title"
        style={{
          color: "#00bcd4",
          textShadow: "0 0 8px rgba(0, 188, 212, 0.4)",
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
        }}
      >
        {t.pageTitle}
      </h2>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 20,
          backgroundColor: "#1e293b",
          borderRadius: "1rem",
          border: "1.5px solid #475569",
          padding: "1rem",
          boxShadow:
            "0 0 8px rgba(255,255,255,0.1), 0 0 10px rgba(0,188,212,0.2)",
        }}
      >
        <div>
          <label style={{ fontWeight: 700 }}>{t.simulation}</label>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#f1f5f9",
                color: "#0f172a",
                border: "none",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "6px 12px",
                boxShadow: "0 0 10px rgba(255,255,255,0.25)",
                transition: "0.3s",
              }}
              onClick={() => setRunning((r) => !r)}
            >
              {running ? t.pause : t.start}
            </button>

            <button
              className="btn btn-ghost"
              style={{
                backgroundColor: "#334155",
                color: "#f8fafc",
                border: "1px solid #475569",
                borderRadius: "8px",
                padding: "6px 12px",
                transition: "0.3s",
              }}
              onClick={() => {
                setSeries(genInitialSeries());
                setBars([
                  { name: t.bars[0], value: 120 },
                  { name: t.bars[1], value: 80 },
                  { name: t.bars[2], value: 50 },
                ]);
                setPie([
                  { name: t.pie[0], value: 60 },
                  { name: t.pie[1], value: 30 },
                  { name: t.pie[2], value: 10 },
                ]);
              }}
            >
              {t.reset}
            </button>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginLeft: 12,
              }}
            >
              <input
                type="checkbox"
                checked={auto}
                onChange={(e) => setAuto(e.target.checked)}
              />{" "}
              <span className="muted">{t.auto}</span>
            </label>
          </div>
        </div>

        <div style={{ marginLeft: "auto" }} className="muted">
          {t.updateInfo}
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid" style={{ display: "grid", gap: "1rem" }}>
        {/* Line Chart */}
        <div
          className="chart-card card"
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "1rem",
            border: "1.5px solid #475569",
            boxShadow:
              "0 0 10px rgba(0,188,212,0.25), inset 0 0 10px rgba(0,188,212,0.1)",
            color: "#f1f5f9",
            padding: "1rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{t.trafficVolume}</div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <XAxis dataKey="t" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#ff5252"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div
          className="chart-card card"
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "1rem",
            border: "1.5px solid #475569",
            boxShadow:
              "0 0 10px rgba(0,188,212,0.25), inset 0 0 10px rgba(0,188,212,0.1)",
            color: "#f1f5f9",
            padding: "1rem",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{t.hotspots}</div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {bars.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div
          className="chart-card card"
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "1rem",
            border: "1.5px solid #475569",
            boxShadow:
              "0 0 10px rgba(0,188,212,0.25), inset 0 0 10px rgba(0,188,212,0.1)",
            color: "#f1f5f9",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{t.trafficState}</div>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pie}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {pie.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
