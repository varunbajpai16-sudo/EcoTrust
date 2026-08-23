import mongoose from "mongoose";

const emissionReadingSchema = new mongoose.Schema(
  {
    factoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Factory",
      required: true,
      index: true,
    },

    sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor",
      required: true,
      index: true,
    },

    timestamp: {
      type: Date,
      required: true,
      index: true,
    },

    pollutants: {
      pm25: {
        type: Number,
        min: 0,
        default: null,
      },

      pm10: {
        type: Number,
        min: 0,
        default: null,
      },

      so2: {
        type: Number,
        min: 0,
        default: null,
      },

      nox: {
        type: Number,
        min: 0,
        default: null,
      },

      co: {
        type: Number,
        min: 0,
        default: null,
      },
    },

    temperature: {
      type: Number,
      default: null,
    },

    pressure: {
      type: Number,
      default: null,
    },

    flowRate: {
      type: Number,
      min: 0,
      default: null,
    },

    // Time when EcoTrust server received the reading
    receivedAt: {
      type: Date,
      default: Date.now,
    },

    // Initial server-side validation
    validationStatus: {
      type: String,
      enum: [
        "pending",
        "valid",
        "invalid",
        "suspicious",
      ],
      default: "pending",
    },

    validationFlags: {
      type: [String],
      default: [],
    },

    // Used later by EcoTrust validation engine
    anomalyScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

emissionReadingSchema.index({
  factoryId: 1,
  timestamp: -1,
});

emissionReadingSchema.index({
  sensorId: 1,
  timestamp: -1,
});

const EmissionReading = mongoose.model(
  "EmissionReading",
  emissionReadingSchema
);

export default EmissionReading;