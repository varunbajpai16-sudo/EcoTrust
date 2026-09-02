import mongoose from "mongoose";

const sensorBaselineSchema = new mongoose.Schema(
  {
    sensorId: {
      type: String,
      required: true,
      unique: true,
    },
    factoryId: {
      type: String,
      required: true,
    },
    stats: {
      pm25: { avg: { type: Number, default: 40 }, stdDev: { type: Number, default: 10 }, count: { type: Number, default: 1 } },
      so2: { avg: { type: Number, default: 30 }, stdDev: { type: Number, default: 8 }, count: { type: Number, default: 1 } },
      nox: { avg: { type: Number, default: 50 }, stdDev: { type: Number, default: 12 }, count: { type: Number, default: 1 } },
      co: { avg: { type: Number, default: 2 }, stdDev: { type: Number, default: 0.5 }, count: { type: Number, default: 1 } },
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const SensorBaseline = mongoose.model("SensorBaseline", sensorBaselineSchema);
export default SensorBaseline;