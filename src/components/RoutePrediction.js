// src/pages/RouteSuggestions.jsx
import React from "react";
import { Map, Navigation, Car } from "lucide-react";

const RouteSuggestions = () => {
  const routes = [
    { id: 1, name: "Route A", congestion: "Low", time: "15 mins" },
    { id: 2, name: "Route B", congestion: "Moderate", time: "22 mins" },
    { id: 3, name: "Route C", congestion: "High", time: "30 mins" },
  ];

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">
        <Navigation className="text-blue-500" /> Route Suggestions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Car className="text-gray-700" /> {route.name}
              </h2>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  route.congestion === "Low"
                    ? "bg-green-100 text-green-700"
                    : route.congestion === "Moderate"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {route.congestion}
              </span>
            </div>
            <p className="text-gray-600 mt-2">
              Estimated Travel Time: <b>{route.time}</b>
            </p>
            <div className="mt-4 bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  route.congestion === "Low"
                    ? "bg-green-500 w-1/3"
                    : route.congestion === "Moderate"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-red-500 w-full"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteSuggestions;
