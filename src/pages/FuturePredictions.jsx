import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const initialPredictions = [
  { time: "Now", forecast: "Moderate traffic on Main St.", value: 40 },
  { time: "30 min", forecast: "Heavy congestion near Central Plaza.", value: 80 },
  { time: "45 min", forecast: "Smooth flow on Ring Road.", value: 30 },
  { time: "60 min", forecast: "Possible slowdown near Market Area.", value: 60 },
  { time: "75 min", forecast: "Traffic light near City Park may delay 5-10 min.", value: 50 },
];

export default function FuturePredictions() {
  const [predictions, setPredictions] = useState(initialPredictions);

  const handleRefresh = () => {
    // Simulate updated traffic values
    const newData = predictions.map(p => ({
      ...p,
      value: Math.floor(Math.random() * 100),
    }));
    setPredictions(newData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Future Predictions</h2>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {predictions.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl shadow-lg border border-gray-300 
                       bg-[#0f172a] text-white 
                       hover:shadow-[0_0_20px_#2563eb] transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{item.time}</h3>
            <p className="text-sm">{item.forecast}</p>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Traffic Density Graph</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
