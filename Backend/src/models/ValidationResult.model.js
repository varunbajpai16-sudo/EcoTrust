import mongoose from "mongoose";

const validationResultSchema = new mongoose.Schema(
  {
    factoryId: {
      type: String, // e.g. "FAC-101"
      required: true,
      index: true,
    },
    factoryName: {
      type: String,
      required: true,
    },
    sensorId: {
      type: String,
      required: true,
      index: true,
    },
    readingTimestamp: {
      type: Date,
      required: true,
    },
    rawReading: {
      pollutants: {
        pm25: Number,
        pm10: Number,
        so2: Number,
        nox: Number,
        co: Number,
      },
      temperature: Number,
      pressure: Number,
      flowRate: Number,
      electricityConsumption: Number,
    },
    trustScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    verdict: {
      type: String,
      enum: ["VERIFIED", "SUSPICIOUS", "TAMPERED", "FAULTY_SENSOR"],
      default: "VERIFIED",
    },
    layer1Checks: {
      missingCheck: { passed: Boolean, details: String },
      sanityBoundsCheck: { passed: Boolean, details: String },
      spikeCheck: { passed: Boolean, details: String },
      flatlineCheck: { passed: Boolean, details: String },
      sensorHealthCheck: { passed: Boolean, details: String },
    },
    layer2Checks: {
      electricityCorrelationCheck: { passed: Boolean, details: String },
      historicalDeviationCheck: { passed: Boolean, details: String },
      multiGasCorrelationCheck: { passed: Boolean, details: String },
    },
    aiSummary: {
      type: String, // Groq LLM generated natural language analysis
      default: "",
    },
    failedFlags: [String],
  },
  { timestamps: true }
);

validationResultSchema.index({ factoryId: 1, createdAt: -1 });

const ValidationResult = mongoose.model("ValidationResult", validationResultSchema);
export default ValidationResult;