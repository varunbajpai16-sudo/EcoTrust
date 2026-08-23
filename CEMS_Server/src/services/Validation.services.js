import Sensor from "../models/sensor.models.js";
import Factory from "../models/Factory.models.js";

/*
|--------------------------------------------------------------------------
| CEMS Validation Service
|--------------------------------------------------------------------------
|
| Purpose:
|   Validate incoming CEMS readings before storing them.
|
| This service checks:
|
|   1. Required fields
|   2. Factory existence
|   3. Sensor existence
|   4. Sensor belongs to factory
|   5. Sensor status
|   6. Numerical values
|   7. Reasonable ranges
|   8. Timestamp
|
| This is NOT the EcoTrust Trust Engine.
|
|--------------------------------------------------------------------------
*/


// ---------------------------------------------------------
// Allowed technical ranges
// ---------------------------------------------------------

const LIMITS = {
  pm25: {
    min: 0,
    max: 500,
  },

  pm10: {
    min: 0,
    max: 1000,
  },

  so2: {
    min: 0,
    max: 1000,
  },

  nox: {
    min: 0,
    max: 1000,
  },

  co: {
    min: 0,
    max: 100,
  },

  temperature: {
    min: -50,
    max: 150,
  },

  pressure: {
    min: 500,
    max: 1200,
  },

  flowRate: {
    min: 0,
    max: 1000,
  },
};


// ---------------------------------------------------------
// Required field validation
// ---------------------------------------------------------

const validateRequiredFields = (reading) => {
  const errors = [];

  if (!reading.factoryId) {
    errors.push("FACTORY_ID_MISSING");
  }

  if (!reading.sensorId) {
    errors.push("SENSOR_ID_MISSING");
  }

  if (!reading.timestamp) {
    errors.push("TIMESTAMP_MISSING");
  }

  if (!reading.pollutants) {
    errors.push("POLLUTANTS_MISSING");
  }

  return errors;
};


// ---------------------------------------------------------
// Factory validation
// ---------------------------------------------------------

const validateFactory = async (factoryId) => {
  const factory = await Factory.findById(factoryId);

  if (!factory) {
    return {
      valid: false,
      error: "FACTORY_NOT_FOUND",
      factory: null,
    };
  }

  if (factory.status !== "active") {
    return {
      valid: false,
      error: "FACTORY_NOT_ACTIVE",
      factory,
    };
  }

  return {
    valid: true,
    error: null,
    factory,
  };
};


// ---------------------------------------------------------
// Sensor validation
// ---------------------------------------------------------

const validateSensor = async (
  sensorId,
  factoryId
) => {
  const sensor = await Sensor.findById(sensorId);

  if (!sensor) {
    return {
      valid: false,
      error: "SENSOR_NOT_FOUND",
      sensor: null,
    };
  }

  if (sensor.status !== "active") {
    return {
      valid: false,
      error: "SENSOR_NOT_ACTIVE",
      sensor,
    };
  }

  if (
    sensor.factoryId.toString() !==
    factoryId.toString()
  ) {
    return {
      valid: false,
      error: "SENSOR_FACTORY_MISMATCH",
      sensor,
    };
  }

  return {
    valid: true,
    error: null,
    sensor,
  };
};


// ---------------------------------------------------------
// Numerical value validation
// ---------------------------------------------------------

const validateNumericalValues = (reading) => {
  const errors = [];

  const values = {
    pm25: reading.pollutants?.pm25,
    pm10: reading.pollutants?.pm10,
    so2: reading.pollutants?.so2,
    nox: reading.pollutants?.nox,
    co: reading.pollutants?.co,

    temperature: reading.temperature,
    pressure: reading.pressure,
    flowRate: reading.flowRate,
  };

  for (const [field, value] of Object.entries(values)) {
    // Optional values can be null
    if (value === null || value === undefined) {
      continue;
    }

    // Must be a number
    if (typeof value !== "number") {
      errors.push(`${field.toUpperCase()}_NOT_NUMBER`);
      continue;
    }

    // NaN / Infinity
    if (!Number.isFinite(value)) {
      errors.push(`${field.toUpperCase()}_NOT_FINITE`);
      continue;
    }

    const limit = LIMITS[field];

    if (!limit) {
      continue;
    }

    if (
      value < limit.min ||
      value > limit.max
    ) {
      errors.push(
        `${field.toUpperCase()}_OUT_OF_RANGE`
      );
    }
  }

  return errors;
};


// ---------------------------------------------------------
// Timestamp validation
// ---------------------------------------------------------

const validateTimestamp = (timestamp) => {
  const errors = [];

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    errors.push("INVALID_TIMESTAMP");

    return errors;
  }

  const now = Date.now();

  // Reading cannot be more than 5 minutes in future
  if (
    date.getTime() >
    now + 5 * 60 * 1000
  ) {
    errors.push("FUTURE_TIMESTAMP");
  }

  // Reading cannot be older than 24 hours
  if (
    date.getTime() <
    now - 24 * 60 * 60 * 1000
  ) {
    errors.push("STALE_TIMESTAMP");
  }

  return errors;
};


// ---------------------------------------------------------
// Detect suspicious but technically possible values
// ---------------------------------------------------------

const detectWarnings = (reading) => {
  const warnings = [];

  const pollutants =
    reading.pollutants || {};

  if (pollutants.pm25 > 200) {
    warnings.push("HIGH_PM25");
  }

  if (pollutants.pm10 > 400) {
    warnings.push("HIGH_PM10");
  }

  if (pollutants.so2 > 200) {
    warnings.push("HIGH_SO2");
  }

  if (pollutants.nox > 300) {
    warnings.push("HIGH_NOX");
  }

  if (pollutants.co > 30) {
    warnings.push("HIGH_CO");
  }

  return warnings;
};


// ---------------------------------------------------------
// Main validation function
// ---------------------------------------------------------

const validateEmissionReading = async (
  reading
) => {
  const errors = [];
  const warnings = [];

  // 1. Required fields
  errors.push(
    ...validateRequiredFields(reading)
  );

  /*
   * If basic structure is invalid,
   * don't query the database.
   */

  if (errors.length > 0) {
    return {
      isValid: false,
      status: "invalid",
      errors,
      warnings,
    };
  }

  // 2. Factory validation
  const factoryResult =
    await validateFactory(
      reading.factoryId
    );

  if (!factoryResult.valid) {
    errors.push(factoryResult.error);
  }

  // 3. Sensor validation
  const sensorResult =
    await validateSensor(
      reading.sensorId,
      reading.factoryId
    );

  if (!sensorResult.valid) {
    errors.push(sensorResult.error);
  }

  // 4. Numerical values
  errors.push(
    ...validateNumericalValues(reading)
  );

  // 5. Timestamp
  errors.push(
    ...validateTimestamp(
      reading.timestamp
    )
  );

  // 6. Suspicious values
  warnings.push(
    ...detectWarnings(reading)
  );

  // Determine final CEMS validation status
  let status = "valid";

  if (errors.length > 0) {
    status = "invalid";
  } else if (warnings.length > 0) {
    status = "suspicious";
  }

  return {
    isValid: errors.length === 0,

    status,

    errors,

    warnings,

    factory: factoryResult.factory,

    sensor: sensorResult.sensor,
  };
};

export default validateEmissionReading;