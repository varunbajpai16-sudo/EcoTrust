// Threshold Limits for Industrial Pollution (CPCB Standards)
const SANITY_LIMITS = {
  pm25: { min: 0, max: 1000 },
  pm10: { min: 0, max: 1500 },
  so2: { min: 0, max: 1200 },
  nox: { min: 0, max: 1200 },
  co: { min: 0, max: 100 },
  temperature: { min: -20, max: 1200 },
  pressure: { min: 50, max: 200 },
  flowRate: { min: 0, max: 50000 },
};

export const runLayer1Validation = (currentReading, pastReadings = []) => {
  const flags = [];
  let scoreDeduction = 0;

  const pollutants = currentReading.pollutants || {};
  const sensor = currentReading.sensorId || {};

  // 1. Missing Value Check
  let missingPassed = true;
  let missingDetails = "All expected pollutant data present";
  const requiredFields = ["pm25", "so2", "nox"];
  const missingKeys = requiredFields.filter((k) => pollutants[k] === null || pollutants[k] === undefined);

  if (missingKeys.length > 0) {
    missingPassed = false;
    missingDetails = `Missing data for: ${missingKeys.join(", ")}`;
    flags.push(`MISSING_DATA_${missingKeys.join("_").toUpperCase()}`);
    scoreDeduction += missingKeys.length * 15;
  }

  // 2. Physical Sanity & Bounds Check (Negative or Impossible values)
  let sanityPassed = true;
  let sanityDetails = "Values within physical limits";
  for (const [key, bounds] of Object.entries(SANITY_LIMITS)) {
    const val = pollutants[key] ?? currentReading[key];
    if (val !== null && val !== undefined) {
      if (val < bounds.min || val > bounds.max) {
        sanityPassed = false;
        sanityDetails = `Unrealistic value for ${key}: ${val} (Expected ${bounds.min}-${bounds.max})`;
        flags.push(`OUT_OF_BOUNDS_${key.toUpperCase()}`);
        scoreDeduction += 20;
      }
    }
  }

  // 3. Spike Check (Sudden > 300% jump compared to previous reading)
  let spikePassed = true;
  let spikeDetails = "No sudden abnormal spikes";
  if (pastReadings.length > 0) {
    const prev = pastReadings[0].pollutants || {};
    for (const key of ["so2", "pm25", "nox"]) {
      if (pollutants[key] && prev[key] && prev[key] > 5) {
        const percentageChange = ((pollutants[key] - prev[key]) / prev[key]) * 100;
        if (percentageChange > 300) {
          spikePassed = false;
          spikeDetails = `Sudden ${key.toUpperCase()} spike of ${percentageChange.toFixed(1)}% detected`;
          flags.push(`SUDDEN_SPIKE_${key.toUpperCase()}`);
          scoreDeduction += 25;
        }
      }
    }
  }

  // 4. Flatline / Sensor Stuck Check (Same decimal value repeated)
  let flatlinePassed = true;
  let flatlineDetails = "Sensor readings show healthy natural variance";
  if (pastReadings.length >= 4) {
    const recentSo2 = [pollutants.so2, ...pastReadings.slice(0, 4).map((r) => r.pollutants?.so2)].filter((v) => v !== undefined);
    const isFlat = recentSo2.length >= 4 && recentSo2.every((val) => val === recentSo2[0]);
    if (isFlat) {
      flatlinePassed = false;
      flatlineDetails = "Identical pollutant values across 5 readings (Frozen sensor suspected)";
      flags.push("SENSOR_FROZEN_FLATLINE");
      scoreDeduction += 30;
    }
  }

  // 5. Sensor Health & Drift Check
  let healthPassed = true;
  let healthDetails = "Sensor calibration & health score normal";
  if (sensor.healthScore !== undefined && sensor.healthScore < 50) {
    healthPassed = false;
    healthDetails = `Sensor hardware health critical (${sensor.healthScore}%)`;
    flags.push("SENSOR_HEALTH_DEGRADED");
    scoreDeduction += 20;
  }
  if (sensor.calibration?.calibrationStatus === "expired") {
    healthPassed = false;
    flags.push("CALIBRATION_EXPIRED");
    scoreDeduction += 15;
  }

  return {
    checks: {
      missingCheck: { passed: missingPassed, details: missingDetails },
      sanityBoundsCheck: { passed: sanityPassed, details: sanityDetails },
      spikeCheck: { passed: spikePassed, details: spikeDetails },
      flatlineCheck: { passed: flatlinePassed, details: flatlineDetails },
      sensorHealthCheck: { passed: healthPassed, details: healthDetails },
    },
    flags,
    scoreDeduction,
  };
};