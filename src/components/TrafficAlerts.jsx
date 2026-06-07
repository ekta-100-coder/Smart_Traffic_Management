import React from "react";

const TrafficAlerts = () => {
  const alerts = [
    { id: 1, type: "Accident", location: "Sector 62, Noida", severity: "High" },
    { id: 2, type: "Traffic Jam", location: "Raj Nagar, Ghaziabad", severity: "Medium" },
    { id: 3, type: "Signal Malfunction", location: "Anand Vihar", severity: "Low" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Live Traffic Alerts
      </h1>
      <div className="grid gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-2xl shadow-md border ${
              alert.severity === "High"
                ? "bg-red-50 border-red-400"
                : alert.severity === "Medium"
                ? "bg-yellow-50 border-yellow-400"
                : "bg-green-50 border-green-400"
            }`}
          >
            <h2 className="text-lg font-semibold">{alert.type}</h2>
            <p className="text-gray-700">{alert.location}</p>
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full mt-2 inline-block ${
                alert.severity === "High"
                  ? "bg-red-500 text-white"
                  : alert.severity === "Medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {alert.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficAlerts;
