import EmissionReading from "../models/EmisionReading.models.js";
import Sensor from "../models/sensor.models.js";
import Factory from "../models/Factory.models.js";

import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import { simulateSensor } from "../services/simulator.services.js";

// ---------------------------------------------------------
// Get latest reading for a factory
// ---------------------------------------------------------

export const getLatestFactoryReading = async (req, res) => {
  const { factoryId } = req.params;

  const factory = await Factory.findOne({ factoryId });

  if (!factory) {
    throw new ApiError(404, "Factory not found");
  }

  const reading = await EmissionReading.findOne({
    factoryId: factory._id,
  })
    .sort({ timestamp: -1 })
    .populate(
      "sensorId",
      "sensorId sensorType status manufacturer modelNumber"
    )
    .populate(
      "factoryId",
      "factoryId name industryType"
    );

  if (!reading) {
    throw new ApiError(
      404,
      "No emission reading found for this factory"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      reading,
      "Latest CEMS reading fetched successfully"
    )
  );
};


// ---------------------------------------------------------
// Get reading history for a factory
// ---------------------------------------------------------

export const getFactoryReadings = async (req, res) => {
  const { factoryId } = req.params;

  const factory = await Factory.findOne({ factoryId });

  if (!factory) {
    throw new ApiError(404, "Factory not found");
  }

  const limit = Math.min(
    Number(req.query.limit) || 100,
    1000
  );

  const readings = await EmissionReading.find({
    factoryId: factory._id,
  })
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate(
      "sensorId",
      "sensorId sensorType status"
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      readings,
      "CEMS reading history fetched successfully"
    )
  );
};


// ---------------------------------------------------------
// Get readings for a sensor
// ---------------------------------------------------------

export const getLatestSensorReading = async (req, res) => {
  const { sensorId } = req.params;

  const sensor = await Sensor.findOne({ sensorId });

  if (!sensor) {
    throw new ApiError(404, "Sensor not found");
  }

  const readings = await EmissionReading.find({
    sensorId: sensor._id,
  })
    .sort({ timestamp: -1 })
    .limit(100)
    .populate(
      "factoryId",
      "factoryId name industryType"
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        sensor: {
          sensorId: sensor.sensorId,
          sensorType: sensor.sensorType,
          status: sensor.status,
          manufacturer: sensor.manufacturer,
          modelNumber: sensor.modelNumber,
        },

        count: readings.length,

        readings,
      },
      "Sensor emission readings fetched successfully"
    )
  );
};


// ---------------------------------------------------------
// Get all sensors of a factory
// ---------------------------------------------------------

export const getFactorySensors = async (req, res) => {
  const { factoryId } = req.params;

  const factory = await Factory.findOne({ factoryId });

  if (!factory) {
    throw new ApiError(404, "Factory not found");
  }

  const sensors = await Sensor.find({
    factoryId: factory._id,
  }).select(
    "sensorId sensorType manufacturer modelNumber status simulationMode lastSeen"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      sensors,
      "Factory sensors fetched successfully"
    )
  );
};


// ---------------------------------------------------------
// Get all active factories
// ---------------------------------------------------------

export const getFactories = async (req, res) => {
  const factories = await Factory.find({
    status: "active",
  }).select(
    "factoryId name industryType location status"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      factories,
      "CEMS factories fetched successfully"
    )
  );
};


export const getsimulated_sensor_data = async (req, res) => {
    const { sensorId } = req.params;

    if (!sensorId) {
        throw new ApiError(400, "Sensor Id not found");
    }

    const sensor = await Sensor.findOne({ sensorId });

    if (!sensor) {
        throw new ApiError(404, "Sensor not found");
    }

    const reading = await simulateSensor(sensor);
    console.log(reading)
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                reading,
                "Sensor data simulated successfully"
            )
        );
};

