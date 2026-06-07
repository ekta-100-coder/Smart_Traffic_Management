import React, { useState, useEffect } from "react";

export default function EmergencyManagement() {
  const [officers, setOfficers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch from backend or fallback to demo data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/emergency-data");
        if (res.ok) {
          const data = await res.json();
          setOfficers(data.officers || []);
          setAlerts(data.alerts || []);
        } else {
          throw new Error("Backend unavailable, using demo data");
        }
      } catch {
        // Fallback demo data
        setOfficers([
          { id: 1, name: "Officer Arjun Singh", rank: "Sub-Inspector", contact: "9876543210", status: "On Duty" },
          { id: 2, name: "Officer Priya Sharma", rank: "Head Constable", contact: "9123456789", status: "Off Duty" },
          { id: 3, name: "Officer Rohan Mehta", rank: "Inspector", contact: "9865321470", status: "On Duty" },
        ]);
        setAlerts([
          { id: 1, type: "Accident", location: "NH-24, Ghaziabad", time: "10:32 AM", attended: true },
          { id: 2, type: "Fire", location: "Sector 15, Noida", time: "11:15 AM", attended: false },
          { id: 3, type: "Traffic Jam", location: "Anand Vihar", time: "12:05 PM", attended: true },
          { id: 4, type: "Medical Emergency", location: "Vasundhara", time: "12:42 PM", attended: false },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAlerts = alerts.filter(
    (a) => filter === "all" || (filter === "attended" ? a.attended : !a.attended)
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">🚨 Emergency Management Dashboard</h2>
      <p className="text-gray-600">View officers, current alerts, and status of attended/unattended cases.</p>

      {loading ? (
        <div className="text-center text-gray-500 mt-10">Loading data...</div>
      ) : (
        <>
          {/* Officers Section */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-xl font-semibold mb-3">👮 On-Duty Officers</h3>
            <div className="grid grid-cols-3 gap-4">
              {officers.map((o) => (
                <div
                  key={o.id}
                  className={`p-4 border rounded-lg ${
                    o.status === "On Duty" ? "border-green-500 bg-green-50" : "border-gray-300"
                  }`}
                >
                  <div className="font-semibold">{o.name}</div>
                  <div className="text-sm text-gray-600">{o.rank}</div>
                  <div className="text-sm text-gray-500">📞 {o.contact}</div>
                  <div
                    className={`mt-2 text-sm font-medium ${
                      o.status === "On Duty" ? "text-green-700" : "text-gray-500"
                    }`}
                  >
                    {o.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Alerts Section */}
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">🚨 Emergency Alerts</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 rounded ${
                    filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("attended")}
                  className={`px-3 py-1 rounded ${
                    filter === "attended" ? "bg-green-600 text-white" : "bg-gray-200"
                  }`}
                >
                  Attended
                </button>
                <button
                  onClick={() => setFilter("unattended")}
                  className={`px-3 py-1 rounded ${
                    filter === "unattended" ? "bg-red-600 text-white" : "bg-gray-200"
                  }`}
                >
                  Unattended
                </button>
              </div>
            </div>

            {filteredAlerts.length === 0 ? (
              <div className="text-gray-500 text-center p-4">No alerts found.</div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Location</th>
                    <th className="p-2 border">Time</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlerts.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{a.id}</td>
                      <td className="p-2 border">{a.type}</td>
                      <td className="p-2 border">{a.location}</td>
                      <td className="p-2 border">{a.time}</td>
                      <td className="p-2 border">
                        <span
                          className={`px-2 py-1 rounded text-white ${
                            a.attended ? "bg-green-600" : "bg-red-600"
                          }`}
                        >
                          {a.attended ? "Attended" : "Unattended"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
