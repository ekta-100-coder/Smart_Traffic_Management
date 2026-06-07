import React, { useState, useEffect, useRef, useContext } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LanguageContext } from "../context/LanguageContext";

export default function RouteSuggestions() {
  const { language } = useContext(LanguageContext);

  const text = {
    en: {
      pageTitle: "🗺️ Smart Route Suggestions",
      from: "From",
      fromPlaceholder: "Enter Source (e.g., Ghaziabad)",
      to: "To",
      toPlaceholder: "Enter Destination (e.g., Noida)",
      findRoutes: "Find Routes",
      loading: "Loading...",
      enterSrcDst: "Enter both source and destination!",
      failedFetch: "Failed to fetch routes. Make sure backend is running.",
      select: "Select",
      preview: "Preview",
      turnByTurn: "🧭 Turn-by-Turn Directions",
      start: "Start",
      destination: "Destination",
      waypoint: "Waypoint",
      noRoutes: "Enter source & destination to get route options.",
      simulateAccident: "🚧 Simulate Accident",
      rerouted: "⚠️ Accident detected ahead — re-routing to safer path.",
      tooClose: "🚨 Accident too close — re-routing not possible!",
    },
    hi: {
      pageTitle: "🗺️ स्मार्ट रूट सुझाव",
      from: "से",
      fromPlaceholder: "स्रोत दर्ज करें (जैसे, गाज़ियाबाद)",
      to: "तक",
      toPlaceholder: "गंतव्य दर्ज करें (जैसे, नोएडा)",
      findRoutes: "रूट खोजें",
      loading: "लोड हो रहा है...",
      enterSrcDst: "कृपया स्रोत और गंतव्य दोनों दर्ज करें!",
      failedFetch: "रूट लाने में विफल। सुनिश्चित करें कि बैकएंड चल रहा है।",
      select: "चुनें",
      preview: "पूर्वावलोकन",
      turnByTurn: "🧭 चरण-दर-चरण निर्देश",
      start: "प्रारंभ",
      destination: "गंतव्य",
      waypoint: "रास्ता पॉइंट",
      noRoutes: "रूट विकल्प पाने के लिए स्रोत और गंतव्य दर्ज करें।",
      simulateAccident: "🚧 दुर्घटना का सिमुलेशन करें",
      rerouted: "⚠️ आगे दुर्घटना का पता चला — सुरक्षित मार्ग पर पुनर्निर्देशित किया जा रहा है।",
      tooClose: "🚨 दुर्घटना बहुत पास है — पुनर्निर्देशन संभव नहीं!",
    },
  };

  const t = text[language];
  const [src, setSrc] = useState("");
  const [dst, setDst] = useState("");
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const mapRef = useRef(null);

  const fetchRoutes = async () => {
    if (!src || !dst) return alert(t.enterSrcDst);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/routes?src=${src}&dst=${dst}`);
      const data = await res.json();
      setRoutes(data.routes || []);
      setSelectedRoute(null);
      setInstructions([]);
    } catch (err) {
      console.error("Error fetching routes:", err);
      alert(t.failedFetch);
    } finally {
      setLoading(false);
    }
  };

  const exampleCoordinates = [
    [28.6139, 77.209],
    [28.6200, 77.2300],
    [28.6280, 77.2600],
    [28.6350, 77.3000],
    [28.628, 77.3649],
  ];

  const reroutedCoordinates = [
    [28.6139, 77.209],
    [28.6185, 77.2250],
    [28.6255, 77.2450],
    [28.6310, 77.2800],
    [28.638, 77.3500],
  ];

  const generateInstructions = (routeName) => [
    { text: `${t.start} ${src}`, turn: "straight" },
    { text: "Go straight for 800 m", turn: "straight" },
    { text: language === "en" ? "Turn left at Red Light" : "लाल बत्ती पर बाएं मुड़ें", turn: "left" },
    { text: "Continue for 1.2 km", turn: "straight" },
    { text: language === "en" ? "Take a right turn towards destination" : "गंतव्य की ओर दायां मोड़ लें", turn: "right" },
    { text: `${t.destination} ${dst}`, turn: "end" },
  ];

  useEffect(() => {
    if (instructions.length === 0) return;
    let i = 0;
    const interval = setInterval(() => {
      setActiveStep(i);
      i++;
      if (i >= instructions.length) clearInterval(interval);
    }, 3000);
    return () => clearInterval(interval);
  }, [instructions]);

  const handleSelect = (r) => {
    setSelectedRoute(r);
    setInstructions(generateInstructions(r.name));
    setActiveStep(0);
    setAlertMsg("");
  };

  const handlePreview = (r) => {
    setSelectedRoute(r);
    setInstructions([]);
    setAlertMsg("");
  };

  // Accident Simulation — Re-route or Warn
  const simulateAccident = () => {
    if (!selectedRoute) {
      alert("Select a route first!");
      return;
    }
    const distance = Math.random() * 10; // 0–10 km
    if (distance < 2) {
      setAlertMsg(t.tooClose);
    } else {
      setAlertMsg(t.rerouted);
      setSelectedRoute({ ...selectedRoute, rerouted: true });
    }
  };

  return (
    <div className="p-6 space-y-5 bg-gray-900 min-h-screen text-white">
      <div
        style={{
          backgroundColor: "#1e293b",
          color: "#ffffff",
          padding: "1rem 1.5rem",
          borderRadius: "1rem",
          border: "1.5px solid #475569",
          boxShadow: "0 0 12px rgba(255,255,255,0.15)",
        }}
      >
        <h2 className="text-3xl font-semibold">{t.pageTitle}</h2>
      </div>

      {/* Inputs */}
      <div
        className="flex gap-3 items-center flex-wrap mb-4"
        style={{
          backgroundColor: "#1e293b",
          borderRadius: "1rem",
          padding: "1rem",
          border: "1.5px solid #475569",
          boxShadow: "0 0 8px rgba(255,255,255,0.1)",
        }}
      >
        <div>
          <label className="font-medium block mb-1 text-gray-200">{t.from}</label>
          <input
            type="text"
            placeholder={t.fromPlaceholder}
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="border rounded-lg px-3 py-2 w-64 focus:outline-none"
            style={{ backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #64748b" }}
          />
        </div>
        <div>
          <label className="font-medium block mb-1 text-gray-200">{t.to}</label>
          <input
            type="text"
            placeholder={t.toPlaceholder}
            value={dst}
            onChange={(e) => setDst(e.target.value)}
            className="border rounded-lg px-3 py-2 w-64 focus:outline-none"
            style={{ backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #64748b" }}
          />
        </div>
        <button
          onClick={fetchRoutes}
          disabled={loading}
          className="text-gray-900 font-semibold px-5 py-2 mt-5 rounded-lg shadow-md transition"
          style={{ backgroundColor: "#f1f5f9", boxShadow: "0 0 10px rgba(255,255,255,0.25)" }}
        >
          {loading ? t.loading : t.findRoutes}
        </button>
        <button
          onClick={simulateAccident}
          className="text-white font-semibold px-5 py-2 mt-5 rounded-lg shadow-md transition"
          style={{ backgroundColor: "#ef4444", boxShadow: "0 0 10px rgba(255,0,0,0.3)" }}
        >
          {t.simulateAccident}
        </button>
      </div>

      {alertMsg && (
        <div
          className="p-3 text-center rounded-lg"
          style={{
            backgroundColor: alertMsg.includes("⚠️") ? "#facc15" : "#ef4444",
            color: "#000",
            fontWeight: 600,
          }}
        >
          {alertMsg}
        </div>
      )}

      {/* Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Route list */}
        <div className="col-span-1 space-y-3 max-h-[500px] overflow-y-auto">
          {routes.length === 0 ? (
            <div
              className="p-4 text-center text-gray-300"
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "1rem",
                border: "1.5px solid #475569",
              }}
            >
              {t.noRoutes}
            </div>
          ) : (
            routes.map((r, i) => (
              <div
                key={i}
                className="p-3 rounded-xl transition"
                style={{
                  backgroundColor: selectedRoute?.name === r.name ? "#0f172a" : "#1e293b",
                  border: `2px solid ${selectedRoute?.name === r.name ? "#94a3b8" : "#334155"}`,
                }}
              >
                <h3 className="font-semibold text-lg text-white">{r.name}</h3>
                <p className="text-sm text-gray-300">{r.detail}</p>
                <p className="text-gray-400 mt-1">ETA: {r.eta}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-slate-700 transition"
                    onClick={() => handleSelect(r)}
                  >
                    {t.select}
                  </button>
                  <button
                    className="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-800 transition"
                    onClick={() => handlePreview(r)}
                  >
                    {t.preview}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Map + directions */}
        <div className="col-span-2 space-y-4">
          <div
            className="h-[500px] rounded-lg overflow-hidden shadow-lg"
            style={{ border: "2px solid #475569" }}
          >
            <MapContainer
              center={[28.6139, 77.209]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(map) => (mapRef.current = map)}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {selectedRoute && (
                <Polyline
                  positions={selectedRoute.rerouted ? reroutedCoordinates : exampleCoordinates}
                  color={selectedRoute.rerouted ? "#facc15" : selectedRoute.color || "#ffffff"}
                  weight={6}
                  opacity={0.9}
                />
              )}
              {exampleCoordinates.map((pos, i) => (
                <Marker key={i} position={pos}>
                  <Popup>
                    {i === 0
                      ? t.start
                      : i === exampleCoordinates.length - 1
                      ? t.destination
                      : `${t.waypoint} ${i}`}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {instructions.length > 0 && (
            <div
              className="border rounded-xl shadow p-4 max-h-[220px] overflow-y-auto"
              style={{ backgroundColor: "#1e293b", border: "1.5px solid #475569" }}
            >
              <h3 className="font-semibold text-lg mb-2 text-white">{t.turnByTurn}</h3>
              <ol className="space-y-2">
                {instructions.map((step, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      style={{
                        color: i === activeStep ? "#f1f5f9" : "#9ca3af",
                        fontSize: 22,
                      }}
                    >
                      💡
                    </span>
                    <span
                      className={`${i === activeStep ? "font-semibold text-white" : "text-gray-300"}`}
                    >
                      {step.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
