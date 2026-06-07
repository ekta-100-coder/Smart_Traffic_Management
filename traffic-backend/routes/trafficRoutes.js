import express from "express";
import Traffic from "../models/Traffic.js";
const router = express.Router();

// Get all traffic data
router.get("/", async (req, res) => {
  try {
    const data = await Traffic.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new traffic record (for testing)
router.post("/", async (req, res) => {
  try {
    const traffic = new Traffic(req.body);
    await traffic.save();
    res.json(traffic);
  } catch (err) {
    res.status(400).json({ message: "Failed to add data" });
  }
});

export default router;
