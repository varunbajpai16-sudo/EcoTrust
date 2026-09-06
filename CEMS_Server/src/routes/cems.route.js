import express from "express";

import {
    getFactories,
    getFactorySensors,
    getLatestFactoryReading,
    getFactoryReadings,
    getLatestSensorReading,
    getsimulated_sensor_data,
    getAreaCompliance
} from "../controller/cems.controller.js";


const router = express.Router();


// =========================================================
// Dashboard / Area
// =========================================================

router.get(
    "/area-compliance",
    getAreaCompliance
);


// =========================================================
// Factory Routes
// =========================================================

router.get(
    "/factories",
    getFactories
);

router.get(
    "/factories/:factoryId/sensors",
    getFactorySensors
);

router.get(
    "/factories/:factoryId/latest",
    getLatestFactoryReading
);

router.get(
    "/factories/:factoryId/readings",
    getFactoryReadings
);


// =========================================================
// Sensor Routes
// =========================================================

router.get(
    "/sensors/:sensorId/latest",
    getLatestSensorReading
);

router.get(
    "/sensors/:sensorId/simulate",
    getsimulated_sensor_data
);


export default router;