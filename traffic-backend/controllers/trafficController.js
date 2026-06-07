import Traffic from "../models/trafficModel.js";

/**
 * GET /api/traffic
 * returns all traffic entries (most recent first)
 */
export const getTrafficData = async (req, res) => {
  try {
    const data = await Traffic.find().sort({ updatedAt: -1 });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    return res.status(500).json({ message: "Error fetching traffic data" });
  }
};

/**
 * POST /api/traffic
 * body: { location: string, congestionLevel: number }
 */
export const addTrafficData = async (req, res) => {
  try {
    const { location, congestionLevel } = req.body;
    if (!location || congestionLevel === undefined) {
      return res.status(400).json({ message: "location and congestionLevel required" });
    }

    const newEntry = new Traffic({ location, congestionLevel });
    await newEntry.save();
    return res.status(201).json({ message: "Data added successfully", newEntry });
  } catch (error) {
    console.error("Error adding traffic data:", error);
    return res.status(500).json({ message: "Error adding traffic data" });
  }
};
