import express from "express";

import {
  getFactories,
  getFactorySensors,
  getLatestFactoryReading,
  getFactoryReadings,
  getLatestSensorReading,
  receiveEmissionReading,
} from "../controller/cems.controller.js";

const router = express.Router();


// =========================================================
// Factory Routes
// =========================================================

// Get all active factories
router.get(
  "/factories",
  getFactories
);


// Get all sensors belonging to a factory
router.get(
  "/factories/:factoryId/sensors",
  getFactorySensors
);


// Get latest emission reading of a factory
router.get(
  "/factories/:factoryId/latest",
  getLatestFactoryReading
);


// Get emission history of a factory
router.get(
  "/factories/:factoryId/readings",
  getFactoryReadings
);


// =========================================================
// Sensor Routes
// =========================================================

// Get latest reading of a sensor
router.get(
  "/sensors/:sensorId/latest",
  getLatestSensorReading
);


// =========================================================
// CEMS Data Ingestion
// =========================================================

// Receive a CEMS emission reading
router.post(
  "/readings",
  receiveEmissionReading
);


export default router;