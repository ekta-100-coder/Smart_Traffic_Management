import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

/* ✅ ROUTES API — with navigation path + turns */
app.get("/api/routes", async (req, res) => {
  const { src, dst } = req.query;
  console.log("Route request received:", src, "→", dst);

  if (!src || !dst)
    return res.status(400).json({ error: "Missing source or destination" });

  try {
    const [geoSrc] = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(src)}`
    ).then((r) => r.json());
    const [geoDst] = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(dst)}`
    ).then((r) => r.json());

    if (!geoSrc || !geoDst)
      return res.status(404).json({ error: "Invalid location" });

    const srcCoord = [parseFloat(geoSrc.lon), parseFloat(geoSrc.lat)];
    const dstCoord = [parseFloat(geoDst.lon), parseFloat(geoDst.lat)];

    const baseUrl = "https://router.project-osrm.org/route/v1/driving";
    const routeRes = await fetch(
      `${baseUrl}/${srcCoord.join(",")};${dstCoord.join(",")}?steps=true&geometries=geojson`
    );
    const routeData = await routeRes.json();

    const route = routeData.routes?.[0];
    const distanceKm = (route.distance / 1000).toFixed(1);
    const durationMin = Math.round(route.duration / 60);

    // ✅ extract all step coordinates & turns
    const steps = route.legs[0].steps.map((s) => ({
      name: s.name,
      maneuver: s.maneuver.type,
      modifier: s.maneuver.modifier,
      location: s.maneuver.location,
      distance: (s.distance / 1000).toFixed(2),
      duration: Math.round(s.duration / 60),
    }));

    res.json({
      routes: [
        {
          name: "Fastest Route",
          detail: `${src} → ${dst}, Toll route — ${distanceKm} km`,
          eta: `${durationMin}m`,
          color: "#2196f3",
          bbox: [srcCoord, dstCoord],
          path: route.geometry.coordinates,
          turns: steps,
        },
        {
          name: "Toll-free Route",
          detail: `${src} → ${dst}, Slightly longer — ${(distanceKm * 1.2).toFixed(1)} km`,
          eta: `${Math.round(durationMin * 1.25)}m`,
          color: "#00c853",
          bbox: [srcCoord, dstCoord],
          path: route.geometry.coordinates,
          turns: steps.slice(0, Math.ceil(steps.length * 0.9)),
        },
        {
          name: "Scenic Route",
          detail: `${src} → ${dst}, Peaceful — ${(distanceKm * 1.5).toFixed(1)} km`,
          eta: `${Math.round(durationMin * 1.5)}m`,
          color: "#ffcc33",
          bbox: [srcCoord, dstCoord],
          path: route.geometry.coordinates,
          turns: steps.slice(0, Math.ceil(steps.length * 0.8)),
        },
      ],
    });
  } catch (err) {
    console.error("Route fetch error:", err);
    res.json({
      routes: [
        { name: "Demo Route", detail: `${src} → ${dst}`, eta: "20m", color: "#999" },
      ],
    });
  }
});

/* ✅ TRAFFIC API — for Dashboard */
app.get("/api/traffic", (req, res) => {
  const traffic = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    location: [
      "Connaught Place",
      "Noida Sec 62",
      "Akshardham",
      "Rajiv Chowk",
      "Saket",
      "Lajpat Nagar",
      "Gurgaon Toll",
      "IGI Airport",
      "Yamuna Bank",
      "Cyber City",
    ][i],
    avgSpeed: Math.floor(25 + Math.random() * 40),
    congestionLevel: Math.floor(Math.random() * 100),
    status: Math.random() < 0.2 ? "Accident" : "Normal",
    emergencyRoute: Math.random() < 0.1,
    updatedAt: new Date().toISOString(),
  }));
  res.json(traffic);
});

app.get("/", (req, res) => res.send("✅ Traffic Backend Running Fine"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚦 Server running on http://localhost:${PORT}`)
);
// ✅ New: Realistic route path for simulation (Delhi → Noida)
app.get("/api/routePath", (req, res) => {
  res.json({
    path: [
      [28.6139, 77.2090], // Connaught Place
      [28.6185, 77.2273],
      [28.6258, 77.2430],
      [28.6305, 77.2650],
      [28.6405, 77.2850],
      [28.6428, 77.3105],
      [28.6285, 77.3325],
      [28.6115, 77.3505],
      [28.5970, 77.3650],
      [28.5862, 77.3800], // Near Akshardham
      [28.5900, 77.3950],
      [28.5980, 77.4100],
      [28.6030, 77.4250],
      [28.6100, 77.4400],
      [28.6200, 77.4550],
      [28.6250, 77.4700],
      [28.6300, 77.4850],
      [28.6350, 77.4950],
      [28.6400, 77.5050],
      [28.6200, 77.5350],
      [28.6133, 77.5800], // Noida
    ],
    steps: [
      "Head east from Connaught Place",
      "Continue straight towards Mandi House",
      "Turn right at Barakhamba Road",
      "Continue for 2 km on India Gate Road",
      "Slight left to join Ring Road",
      "Take Akshardham Flyover",
      "Continue on Delhi–Noida Direct Flyway",
      "Take exit towards Sector 15 Noida",
      "Turn right at Mahamaya Flyover",
      "You have reached your destination — Noida"
    ]
  });
});
