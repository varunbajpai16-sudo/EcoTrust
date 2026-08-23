import Sensor from "../models/sensor.models.js";
import EmissionReading from "../models/EmisionReading.models.js";

/*
|--------------------------------------------------------------------------
| Sensor Health Service
|--------------------------------------------------------------------------
|
| Calculates the health/reliability of a CEMS sensor.
|
| Health is based on:
|
| 1. Data Availability
| 2. Communication Reliability
| 3. Data Stability
| 4. Drift
| 5. Calibration
|
| Final Score:
|
| Data Availability     -> 25%
| Communication         -> 15%
| Data Stability        -> 20%
| Drift                 -> 20%
| Calibration           -> 20%
|
|--------------------------------------------------------------------------
*/


// ---------------------------------------------------------
// Calculate Data Availability
// ---------------------------------------------------------

const calculateDataAvailability = (readings, expectedReadings) => {
  if (expectedReadings === 0) {
    return 100;
  }

  const availability =
    (readings.length / expectedReadings) * 100;

  return Math.min(100, Math.max(0, availability));
};


// ---------------------------------------------------------
// Calculate Communication Reliability
// ---------------------------------------------------------

const calculateCommunicationReliability = (readings) => {
  if (!readings.length) {
    return 0;
  }

  let totalDelay = 0;

  readings.forEach((reading) => {
    if (reading.timestamp && reading.receivedAt) {
      const delay =
        new Date(reading.receivedAt) -
        new Date(reading.timestamp);

      totalDelay += Math.max(0, delay);
    }
  });

  const averageDelay =
    totalDelay / readings.length;

  /*
   * Demo thresholds:
   *
   * < 2 sec  → excellent
   * < 5 sec  → good
   * < 10 sec → acceptable
   * > 10 sec → poor
   */

  if (averageDelay < 2000) return 100;
  if (averageDelay < 5000) return 90;
  if (averageDelay < 10000) return 75;

  return 50;
};


// ---------------------------------------------------------
// Calculate Data Stability
// ---------------------------------------------------------

const calculateDataStability = (readings) => {
  if (readings.length < 2) {
    return 100;
  }

  const pmValues = readings
    .map((reading) => reading.pollutants?.pm25)
    .filter((value) => value !== null && value !== undefined);

  if (pmValues.length < 2) {
    return 100;
  }

  let identicalCount = 0;

  for (let i = 1; i < pmValues.length; i++) {
    if (pmValues[i] === pmValues[i - 1]) {
      identicalCount++;
    }
  }

  const flatlineRatio =
    identicalCount / (pmValues.length - 1);

  /*
   * A sensor constantly sending
   * exactly the same value is suspicious.
   */

  if (flatlineRatio >= 0.8) {
    return 30;
  }

  if (flatlineRatio >= 0.5) {
    return 60;
  }

  return 100;
};


// ---------------------------------------------------------
// Calculate Drift Score
// ---------------------------------------------------------

const calculateDrift = (readings) => {
  if (readings.length < 5) {
    return {
      driftPercentage: 0,
      score: 100,
      status: "normal",
    };
  }

  const pmValues = readings
    .map((reading) => reading.pollutants?.pm25)
    .filter((value) => value !== null && value !== undefined);

  if (pmValues.length < 5) {
    return {
      driftPercentage: 0,
      score: 100,
      status: "normal",
    };
  }

  /*
   * Compare the average of the beginning
   * with the average of the latest readings.
   */

  const sampleSize = Math.min(5, pmValues.length);

  const firstValues = pmValues.slice(0, sampleSize);

  const latestValues =
    pmValues.slice(-sampleSize);

  const firstAverage =
    firstValues.reduce((sum, value) => sum + value, 0) /
    firstValues.length;

  const latestAverage =
    latestValues.reduce((sum, value) => sum + value, 0) /
    latestValues.length;

  if (firstAverage === 0) {
    return {
      driftPercentage: 0,
      score: 100,
      status: "normal",
    };
  }

  const driftPercentage =
    Math.abs(
      ((latestAverage - firstAverage) /
        firstAverage) *
        100
    );

  let score = 100;
  let status = "normal";

  if (driftPercentage >= 20) {
    score = 40;
    status = "critical";
  } else if (driftPercentage >= 10) {
    score = 70;
    status = "warning";
  }

  return {
    driftPercentage: Number(driftPercentage.toFixed(2)),
    score,
    status,
  };
};


// ---------------------------------------------------------
// Calculate Calibration Score
// ---------------------------------------------------------

const calculateCalibrationScore = (sensor) => {
  const calibrationStatus =
    sensor.calibration?.calibrationStatus;

  if (calibrationStatus === "expired") {
    return 30;
  }

  if (calibrationStatus === "due") {
    return 70;
  }

  return 100;
};


// ---------------------------------------------------------
// Calculate Final Sensor Health
// ---------------------------------------------------------

const calculateHealthScore = ({
  availability,
  communication,
  stability,
  drift,
  calibration,
}) => {
  const score =
    availability * 0.25 +
    communication * 0.15 +
    stability * 0.20 +
    drift * 0.20 +
    calibration * 0.20;

  return Number(score.toFixed(2));
};


// ---------------------------------------------------------
// Main Sensor Health Function
// ---------------------------------------------------------

export const calculateSensorHealth = async (sensorId) => {
  try {
    const sensor = await Sensor.findById(sensorId);

    if (!sensor) {
      throw new Error("Sensor not found");
    }

    /*
     * Get recent readings.
     *
     * For demo purposes we analyze
     * the latest 100 readings.
     */

    const readings = await EmissionReading.find({
      sensorId: sensor._id,
    })
      .sort({ timestamp: -1 })
      .limit(100);

    /*
     * Reverse so calculations happen
     * chronologically.
     */

    readings.reverse();

    // --------------------------------------------
    // Expected readings
    // --------------------------------------------

    /*
     * If simulator sends data every 5 seconds,
     * expected readings per minute = 12.
     *
     * For this first version we use the number
     * of stored readings as the basis.
     */

    const expectedReadings = Math.max(
      readings.length,
      1
    );

    // --------------------------------------------
    // Calculate individual scores
    // --------------------------------------------

    const availability =
      calculateDataAvailability(
        readings,
        expectedReadings
      );

    const communication =
      calculateCommunicationReliability(
        readings
      );

    const stability =
      calculateDataStability(readings);

    const drift =
      calculateDrift(readings);

    const calibration =
      calculateCalibrationScore(sensor);

    // --------------------------------------------
    // Final health score
    // --------------------------------------------

    const healthScore =
      calculateHealthScore({
        availability,
        communication,
        stability,
        drift: drift.score,
        calibration,
      });

    // --------------------------------------------
    // Update Sensor
    // --------------------------------------------

    sensor.healthScore = healthScore;

    sensor.drift = {
      currentValue: drift.driftPercentage,
      driftPercentage: drift.driftPercentage,
      status: drift.status,
      lastCalculatedAt: new Date(),
    };

    sensor.lastSeen =
      readings.length
        ? readings[readings.length - 1].receivedAt
        : sensor.lastSeen;

    await sensor.save();

    // --------------------------------------------
    // Return health report
    // --------------------------------------------

    return {
      sensorId: sensor.sensorId,

      healthScore,

      components: {
        dataAvailability: Number(
          availability.toFixed(2)
        ),

        communicationReliability: Number(
          communication.toFixed(2)
        ),

        dataStability: Number(
          stability.toFixed(2)
        ),

        drift: Number(
          drift.score.toFixed(2)
        ),

        calibration: Number(
          calibration.toFixed(2)
        ),
      },

      drift: {
        percentage: drift.driftPercentage,
        status: drift.status,
      },

      status:
        healthScore >= 80
          ? "healthy"
          : healthScore >= 60
          ? "warning"
          : "critical",
    };

  } catch (error) {
    console.error(
      "❌ Sensor health calculation failed:",
      error.message
    );

    throw error;
  }
};


// ---------------------------------------------------------
// Calculate health for all active sensors
// ---------------------------------------------------------

export const calculateAllSensorHealth = async () => {
  try {
    const sensors = await Sensor.find({
      status: "active",
    });

    const results = [];

    for (const sensor of sensors) {
      const result =
        await calculateSensorHealth(sensor._id);

      results.push(result);
    }

    return results;

  } catch (error) {
    console.error(
      "❌ Failed to calculate sensor health:",
      error.message
    );

    throw error;
  }
};