import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
  {
    sensorId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    factoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Factory",
      required: true,
    },

    sensorType: {
      type: String,
      enum: [
        "CEMS",
        "PM",
        "SO2",
        "NOx",
        "CO",
        "Multi-Gas",
        "Flow",
        "Temperature",
        "Pressure",
      ],
      default: "CEMS",
    },

    manufacturer: {
      type: String,
      trim: true,
      default: "Demo Sensor",
    },

    modelNumber: {
      type: String,
      trim: true,
      default: "CEMS-DEMO-001",
    },

    installationDate: {
      type: Date,
      default: Date.now,
    },

    lastSeen: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "maintenance", "faulty"],
      default: "active",
    },

    // Overall sensor reliability score
    healthScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 100,
    },

    // Sensor drift information
    drift: {
      currentValue: {
        type: Number,
        default: 0,
      },

      driftPercentage: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: ["normal", "warning", "critical"],
        default: "normal",
      },

      lastCalculatedAt: {
        type: Date,
        default: null,
      },
    },

    // Sensor calibration information
    calibration: {
      lastCalibrationDate: {
        type: Date,
        default: null,
      },

      nextCalibrationDate: {
        type: Date,
        default: null,
      },

      calibrationStatus: {
        type: String,
        enum: ["valid", "due", "expired"],
        default: "valid",
      },
    },

    // Used only by our demo CEMS simulator
    simulationMode: {
      type: String,
      enum: [
        "normal",
        "spike",
        "drift",
        "flatline",
        "missing",
        "suspicious",
      ],
      default: "normal",
    },
  },
  {
    timestamps: true,
  }
);

const Sensor = mongoose.model("Sensor", sensorSchema);

export default Sensor;