import mongoose from "mongoose";

const trafficSchema = new mongoose.Schema({
  location: { type: String, required: true },
  congestionLevel: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Traffic = mongoose.model("Traffic", trafficSchema);
export default Traffic;
