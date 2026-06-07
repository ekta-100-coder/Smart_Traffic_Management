import React from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function AlertsFeed() {
  const alerts = [
    { id: 1, type: "Emergency Route", message: "Ambulance detected near Sector 62" },
    { id: 2, type: "Accident", message: "Accident at NH9 - moderate delay" },
    { id: 3, type: "Congestion", message: "Heavy traffic near Indirapuram" },
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-700">
        <Bell size={18} className="text-red-500" /> Live Alerts
      </h2>

      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="p-3 bg-gray-50 border-l-4 border-red-500 rounded"
          >
            <strong>{a.type}:</strong> {a.message}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
