import React from "react";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { Activity } from "lucide-react";

const areas = [
  { name: "Indirapuram", density: "High" },
  { name: "Vaishali", density: "Moderate" },
  { name: "Raj Nagar", density: "Low" },
];

const TrafficDensity = () => (
  <div className="traffic-density">
    <h2 className="page-title">Traffic Density Analysis</h2>
    <div className="card-grid">
      {areas.map((a, i) => (
        <Card key={i}>
          <CardHeader><Activity /> {a.name}</CardHeader>
          <CardContent>Density Level: <b>{a.density}</b></CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default TrafficDensity;
