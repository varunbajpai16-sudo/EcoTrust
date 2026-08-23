import mongoose from "mongoose";

const factorySchema = new mongoose.Schema(
  {
    factoryId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    industryType: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      address: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },

        coordinates: {
          type: [Number],
          default: [0, 0],
        },
      },
    },

    electricityConsumption: {
      type: Number,
      default: 0,
    },

    productionCapacity: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

factorySchema.index({
  "location.coordinates": "2dsphere",
});

const Factory = mongoose.model("Factory", factorySchema);

export default Factory;