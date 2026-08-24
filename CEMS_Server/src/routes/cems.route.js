import express from "express";

import {
  getFactories,
  getFactorySensors,
  getLatestFactoryReading,
  getFactoryReadings,
  getLatestSensorReading,
  getsimulated_sensor_data
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

//Get the simulated data for the sensor

router.get(
  "/sensors/:sensorId/simulate",
  getsimulated_sensor_data
);


export default router;