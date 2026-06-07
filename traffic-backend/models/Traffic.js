import mongoose from "mongoose";

const trafficSchema = new mongoose.Schema({
  location: { type: String, required: true },
  status: { type: String, required: true },
  density: { type: Number, required: true },
  emergencyRoute: { type: Boolean, default: false },
});

export default mongoose.model("Traffic", trafficSchema);
