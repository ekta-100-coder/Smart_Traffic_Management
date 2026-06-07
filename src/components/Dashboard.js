import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Live Traffic Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-red-100 rounded-lg shadow">
          <h3 className="font-bold text-red-700">High Traffic Zone</h3>
          <p>NH-9 towards Ghaziabad — Heavy congestion detected 🚗🚗🚗</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="font-bold text-green-700">Smooth Traffic</h3>
          <p>Vasundhara Sector 5 — Flowing normally ✅</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
