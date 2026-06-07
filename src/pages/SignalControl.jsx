import React, { useState, useMemo, useContext } from "react";
import "../App.css";
import { LanguageContext } from "../context/LanguageContext";

const SIDEBAR_COLOR = "#0f172a";

const DEFAULT_INTERSECTIONS = [
  { id: "INT-CP-01", name: "Connaught Place - T Point", coords: [28.633, 77.216], lanes: { North: 30, East: 20, South: 25, West: 20 }, yellow: 4 },
  { id: "INT-RAJ-02", name: "Raj Nagar - 4 Way", coords: [28.657, 77.233], lanes: { North: 40, East: 30, South: 35, West: 30 }, yellow: 5 },
  { id: "INT-KA-03", name: "Kaushambi - 3 Way", coords: [28.595, 77.265], lanes: { North: 25, East: 20, South: 20 }, yellow: 3 }
];

export default function SignalControl() {
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      pageTitle: "Signal Control",
      searchPlaceholder: "Search area / intersection (e.g., Connaught, Raj Nagar)",
      selectInstruction: "Select an intersection to edit lane timings",
      noIntersections: "No intersections found.",
      infoTitle: "How lane adjustment works",
      infoText: "- Adjust green time per lane. Minimum 5 seconds.\n- Apply saves for this prototype (local state).\n- Yellow time applies to full intersection cycle.",
      selectLeft: "Select an intersection on the left to view and edit lane timings.",
      yellowLabel: "Yellow time (sec)",
      yellowTip: "Yellow time affects all lanes during transition",
      laneActive: "Lane Active",
      laneNotPresent: "Not present",
      tip: "Tip: increase green where congestion is high.",
      applyChanges: "Apply changes",
      reset: "Reset",
    },
    hi: {
      pageTitle: "सिग्नल नियंत्रण",
      searchPlaceholder: "क्षेत्र / चौराहा खोजें (जैसे, कॉनॉट प्लेस, राज नगर)",
      selectInstruction: "लेन समय को संपादित करने के लिए एक चौराहा चुनें",
      noIntersections: "कोई चौराहा नहीं मिला।",
      infoTitle: "लेन समायोजन कैसे काम करता है",
      infoText: "- प्रत्येक लेन के लिए हरे समय को समायोजित करें। न्यूनतम 5 सेकंड।\n- इस प्रोटोटाइप के लिए लागू करना (स्थानीय स्थिति) सुरक्षित करता है।\n- पीले समय का असर पूरे चौराहा चक्र पर होता है।",
      selectLeft: "लेन समय देखने और संपादित करने के लिए बाईं ओर चौराहा चुनें।",
      yellowLabel: "पीला समय (सेकंड)",
      yellowTip: "पीला समय संक्रमण के दौरान सभी लेनों पर लागू होता है",
      laneActive: "लेन सक्रिय",
      laneNotPresent: "उपस्थित नहीं",
      tip: "संकेत: जाम वाले क्षेत्रों में हरा समय बढ़ाएं।",
      applyChanges: "परिवर्तन लागू करें",
      reset: "रीसेट करें",
    },
  }[language];

  const [query, setQuery] = useState("");
  const [intersections, setIntersections] = useState(DEFAULT_INTERSECTIONS);
  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(() => intersections.find(i => i.id === selectedId) || null, [intersections, selectedId]);
  const [editState, setEditState] = useState({ lanes: {}, yellow: 4 });

  const handleSelect = (id) => {
    setSelectedId(id);
    const s = intersections.find(i => i.id === id);
    if (!s) return;
    setEditState({ lanes: { ...s.lanes }, yellow: s.yellow ?? 4 });
    setTimeout(() => {
      const el = document.querySelector(".signal-panel");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const adjustLane = (lane, delta) => {
    setEditState(prev => {
      const cur = prev.lanes[lane] ?? 0;
      const updated = Math.max(5, cur + delta);
      return { ...prev, lanes: { ...prev.lanes, [lane]: updated } };
    });
  };

  const setLaneValue = (lane, val) => {
    const n = Number(val) || 0;
    setEditState(prev => ({ ...prev, lanes: { ...prev.lanes, [lane]: Math.max(5, n) } }));
  };

  const applyChanges = () => {
    if (!selected) return;
    setIntersections(prev => prev.map(i => {
      if (i.id !== selected.id) return i;
      return { ...i, lanes: { ...editState.lanes }, yellow: editState.yellow };
    }));
    alert(`${t.applyChanges} ${selected.name}`);
  };

  const filtered = intersections.filter(i => {
    if (!query) return true;
    return (i.name + " " + i.id).toLowerCase().includes(query.toLowerCase());
  });

  const cardStyle = {
    background: SIDEBAR_COLOR,
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0 0 15px rgba(15, 23, 42, 0.6)",
    padding: "16px",
  };

  const inputStyle = {
    background: "#1e293b",
    color: "#f8fafc",
    border: "1px solid #38bdf8",
    borderRadius: "8px",
    padding: "6px 10px",
    width: "60px",
    textAlign: "center",
    fontWeight: 600,
  };

  const searchInputStyle = {
    background: "#1e293b",
    color: "#f8fafc",
    border: "1px solid #38bdf8",
    borderRadius: "10px",
    padding: "8px 14px",
    flex: 1,
    outline: "none",
  };

  const btnStyle = {
    background: "#1e293b",
    color: "#e0f2fe",
    border: "1px solid #38bdf8",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.3s",
  };

  const btnHover = {
    background: "#38bdf8",
    color: "#0f172a",
  };

  return (
    <div className="page-container signal-page">
      <h2 className="page-title" style={{ color: SIDEBAR_COLOR }}>
        {t.pageTitle}
      </h2>

      <div className="card" style={cardStyle}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={searchInputStyle}
          />
          <div style={{ marginLeft: "auto", color: "#ddd" }}>{t.selectInstruction}</div>
        </div>
      </div>

      <div style={{ height: 12 }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 18 }}>
        {/* Left Section */}
        <div>
          <div className="card" style={cardStyle}>
            <h3 style={{ marginTop: 0, color: "#fff" }}>{t.pageTitle}</h3>
            {filtered.length === 0 && <div style={{ color: "#ddd" }}>{t.noIntersections}</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
              {filtered.map((it) => (
                <button
                  key={it.id}
                  onClick={() => handleSelect(it.id)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    background: selectedId === it.id ? "#1e293b" : "#0f172a",
                    color: "#fff",
                    borderRadius: "10px",
                    border: selectedId === it.id ? "1px solid #38bdf8" : "1px solid transparent",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700 }}>{it.name}</div>
                    <div style={{ fontSize: 13, color: "#ccc" }}>
                      {it.id} • {Object.keys(it.lanes).length}-lane
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "#ccc" }}>
                    {Object.keys(it.lanes).join(", ")}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: 14 }} />

          <div className="card" style={cardStyle}>
            <h4 style={{ marginTop: 0, color: "#fff" }}>{t.infoTitle}</h4>
            <div style={{ color: "#ddd", whiteSpace: "pre-line", lineHeight: 1.4 }}>{t.infoText}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="signal-panel">
          {!selected && (
            <div className="card" style={cardStyle}>
              <div style={{ color: "#ccc" }}>{t.selectLeft}</div>
            </div>
          )}

          {selected && (
            <div className="card" style={cardStyle}>
              <h3 style={{ marginTop: 0, color: "#fff" }}>{selected.name}</h3>
              <div style={{ marginBottom: 12, color: "#ccc" }}>
                {selected.id} • Coordinates: {selected.coords.join(", ")}
              </div>

              {/* Yellow time */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, color: "#fff" }}>{t.yellowLabel}</div>
                <input
                  type="number"
                  value={editState.yellow}
                  onChange={(e) =>
                    setEditState(prev => ({ ...prev, yellow: Math.max(2, Number(e.target.value) || 2) }))
                  }
                  style={inputStyle}
                />
                <div style={{ color: "#ddd" }}>{t.yellowTip}</div>
              </div>

              {/* Lane cards */}
              <div className="signals-grid">
                {["North", "East", "South", "West"].map((lane) => {
                  const exists = editState.lanes && Object.prototype.hasOwnProperty.call(editState.lanes, lane);
                  const value = exists ? editState.lanes[lane] : "-";
                  return (
                    <div
                      key={lane}
                      style={{
                        background: SIDEBAR_COLOR,
                        color: "#fff",
                        borderRadius: "14px",
                        boxShadow: "0 0 12px rgba(15, 23, 42, 0.6)",
                        padding: "12px",
                        opacity: exists ? 1 : 0.55,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: 800 }}>{lane}</div>
                        <div style={{ fontSize: 13, color: "#ccc" }}>
                          {exists ? t.laneActive : t.laneNotPresent}
                        </div>
                      </div>

                      <div style={{ height: 8 }} />

                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        {["-5s", "-1s", "+1s", "+5s"].map((label, i) => (
                          <button
                            key={i}
                            style={btnStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, btnHover)}
                            onMouseOut={(e) => Object.assign(e.target.style, btnStyle)}
                            onClick={() =>
                              exists &&
                              adjustLane(lane, label.includes("+") ? Number(label.replace("s", "")) : Number(label.replace("s", "")))
                            }
                          >
                            {label}
                          </button>
                        ))}
                        <input
                          value={value}
                          onChange={(e) => exists && setLaneValue(lane, e.target.value)}
                          style={inputStyle}
                          disabled={!exists}
                        />
                      </div>

                      <div style={{ fontSize: 13, color: "#cbd5e1" }}>{t.tip}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ height: 12 }} />
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-primary" onClick={applyChanges}>{t.applyChanges}</button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setEditState({ lanes: { ...selected.lanes }, yellow: selected.yellow })}
                >
                  {t.reset}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
