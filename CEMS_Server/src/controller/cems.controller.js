import EmissionReading from "../models/EmisionReading.models.js";
import Sensor from "../models/sensor.models.js";
import Factory from "../models/Factory.models.js";

import validateEmissionReading from "../services/Validation.services.js";

import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";


// ---------------------------------------------------------
// Get latest reading for a factory
// ---------------------------------------------------------

export const getLatestFactoryReading = async (req, res) => {
  const { factoryId } = req.params;

  const reading = await EmissionReading.findOne({
    factoryId,
  })
    .sort({ timestamp: -1 })
    .populate("sensorId", "sensorId sensorType status healthScore")
    .populate("factoryId", "factoryId name industryType");

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

  const limit = Math.min(
    Number(req.query.limit) || 100,
    1000
  );

  const readings = await EmissionReading.find({
    factoryId,
  })
    .sort({ timestamp: -1 })
    .limit(limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      readings,
      "CEMS reading history fetched successfully"
    )
  );
};


// ---------------------------------------------------------
// Get latest reading for a sensor
// ---------------------------------------------------------

export const getLatestSensorReading = async (req, res) => {
  const { sensorId } = req.params;

  const reading = await EmissionReading.findOne({
    sensorId,
  })
    .sort({ timestamp: -1 })
    .populate(
      "sensorId",
      "sensorId sensorType status healthScore"
    );

  if (!reading) {
    throw new ApiError(
      404,
      "No emission reading found for this sensor"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      reading,
      "Latest sensor reading fetched successfully"
    )
  );
};


// ---------------------------------------------------------
// Get all sensors of a factory
// ---------------------------------------------------------

export const getFactorySensors = async (req, res) => {
  const { factoryId } = req.params;

  const sensors = await Sensor.find({
    factoryId,
  }).select(
    "sensorId sensorType manufacturer modelNumber status healthScore simulationMode lastSeen"
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
// Get all factories
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


// ---------------------------------------------------------
// Receive a CEMS reading
// ---------------------------------------------------------

export const receiveEmissionReading = async (
  req,
  res
) => {
  const readingData = req.body;

  // -----------------------------------------------
  // Validate incoming reading
  // -----------------------------------------------

  const validation =
    await validateEmissionReading(
      readingData
    );

  // -----------------------------------------------
  // If completely invalid, don't store it
  // -----------------------------------------------

  if (!validation.isValid) {
    throw new ApiError(
      400,
      "Invalid CEMS emission reading",
      validation.errors
    );
  }

  // -----------------------------------------------
  // Store reading
  // -----------------------------------------------

  const reading =
    await EmissionReading.create({
      factoryId: readingData.factoryId,

      sensorId: readingData.sensorId,

      timestamp: readingData.timestamp,

      pollutants: readingData.pollutants,

      temperature: readingData.temperature,

      pressure: readingData.pressure,

      flowRate: readingData.flowRate,

      receivedAt: new Date(),

      validationStatus:
        validation.status,

      validationFlags:
        validation.warnings,
    });

  return res.status(201).json(
    new ApiResponse(
      201,
      reading,
      "CEMS emission reading received successfully"
    )
  );
};