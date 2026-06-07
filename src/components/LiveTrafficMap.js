import React from "react";

const LiveTrafficMap = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">
        🗺️ Live Traffic Map
      </h2>
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-600">
        (Map Preview Placeholder)
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Real map integration coming soon using Google Maps API.
      </p>
    </div>
  );
};

export default LiveTrafficMap;
