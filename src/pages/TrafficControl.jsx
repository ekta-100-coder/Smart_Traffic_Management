import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TrafficControl() {
  const [mode, setMode] = useState("Automatic");
  const [signalTime, setSignalTime] = useState(45);

  const congestionAreas = [
    { area: "Connaught Place", level: "High" },
    { area: "Noida Sector 62", level: "Medium" },
    { area: "Indirapuram", level: "High" },
  ];

  return (
    <motion.div
      className="p-6 text-gray-800"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Traffic Light Adjustment
      </h1>

      <div className="bg-white shadow-lg p-5 rounded-2xl w-full max-w-lg">
        <label className="block mb-2 font-semibold">Mode</label>
        <select
          className="border px-3 py-2 rounded-md w-full"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option>Automatic</option>
          <option>Manual</option>
        </select>

        {mode === "Manual" && (
          <>
            <label className="block mt-4 mb-2 font-semibold">
              Green Light Duration (seconds)
            </label>
            <input
              type="number"
              className="border px-3 py-2 rounded-md w-full"
              value={signalTime}
              onChange={(e) => setSignalTime(e.target.value)}
            />
          </>
        )}

        <button
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Apply Changes
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          High Congestion Areas
        </h2>
        <ul className="space-y-2">
          {congestionAreas.map((c) => (
            <li
              key={c.area}
              className="p-3 bg-red-50 border-l-4 border-red-500 rounded"
            >
              {c.area} — <strong>{c.level}</strong> congestion
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
