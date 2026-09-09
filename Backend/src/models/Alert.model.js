import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    factoryId: {
      type: String,
      required: true,
      index: true,
    },
    factoryName: {
      type: String,
      required: true,
    },
    sensorId: String,
    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    aiExplanation: String,
    flags: [String],
    isResolved: {
      type: Boolean,
      default: false,
    },
    resolvedAt: Date,
  },
  { timestamps: true }
);

const Alert = mongoose.model("Alert", alertSchema);
export default Alert;