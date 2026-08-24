import Sensor from "../models/sensor.models.js";
import EmissionReading from "../models/EmisionReading.models.js";


const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};



const round = (value, decimals = 2) => {
  return Number(value.toFixed(decimals));
};

const generateNormalData = () => {
  return {
    pm25: round(randomBetween(25, 60)),
    pm10: round(randomBetween(45, 100)),
    so2: round(randomBetween(10, 40)),
    nox: round(randomBetween(20, 70)),
    co: round(randomBetween(1, 8)),
  };
};




const generateSpikeData = () => {
  return {
    pm25: round(randomBetween(120, 250)),
    pm10: round(randomBetween(180, 350)),
    so2: round(randomBetween(80, 150)),
    nox: round(randomBetween(120, 220)),
    co: round(randomBetween(10, 25)),
  };
};



const generateSuspiciousData = () => {
  return {
    pm25: round(randomBetween(39.5, 40.5)),
    pm10: round(randomBetween(59.5, 60.5)),
    so2: round(randomBetween(19.5, 20.5)),
    nox: round(randomBetween(29.5, 30.5)),
    co: round(randomBetween(4.5, 5.5)),
  };
};




const generateFlatlineData = (sensor) => {
  if (!sensor._flatlineValues) {
    sensor._flatlineValues = {
      pm25: 42.5,
      pm10: 70.2,
      so2: 20.4,
      nox: 35.8,
      co: 4.2,
    };
  }

  return sensor._flatlineValues;
};

const generateDriftData = (sensor) => {

  if (!sensor._driftLevel) {
    sensor._driftLevel = 0;
  }

  sensor._driftLevel += randomBetween(0.5, 1.5);

  const drift = sensor._driftLevel;

  return {
    pm25: round(40 + drift),
    pm10: round(65 + drift * 1.5),
    so2: round(18 + drift * 0.4),
    nox: round(32 + drift * 1.2),
    co: round(4 + drift * 0.1),
  };
};




const generateReading = (sensor) => {
  let pollutants;

  switch (sensor.simulationMode) {
    case "spike":
      pollutants = generateSpikeData();
      break;

    case "drift":
      pollutants = generateDriftData(sensor);
      break;

    case "flatline":
      pollutants = generateFlatlineData(sensor);
      break;

    case "suspicious":
      pollutants = generateSuspiciousData();
      break;

    case "missing":
      return null;

    case "normal":
    default:
      pollutants = generateNormalData();
      break;
  }

  return {
    factoryId: sensor.factoryId,
    sensorId: sensor._id,

    timestamp: new Date(),

    pollutants,

    temperature: round(randomBetween(25, 35)),

    pressure: round(randomBetween(995, 1020)),

    flowRate: round(randomBetween(70, 100)),
  };
};



export const simulateSensor = async (sensor) => {
  try {
    const reading = generateReading(sensor);

    if (!reading) {
      console.log(
        `⚠️ ${sensor.sensorId} → No reading generated (MISSING DATA)`
      );

      return null;
    }

    console.log(
      `📡 ${sensor.sensorId} → ${sensor.simulationMode.toUpperCase()}`
    );

    console.log(
      `   PM2.5: ${reading.pollutants.pm25} | ` +
      `PM10: ${reading.pollutants.pm10} | ` +
      `SO₂: ${reading.pollutants.so2} | ` +
      `NOx: ${reading.pollutants.nox} | ` +
      `CO: ${reading.pollutants.co}`
    );

    // Store reading in MongoDB
    const savedReading = await EmissionReading.create(reading);

    console.log(
      `✅ Reading saved → ${savedReading._id}`
    );

    return savedReading;

  } catch (error) {
    console.error(
      `❌ Simulator error for ${sensor?.sensorId || "UNKNOWN"}:`,
      error.message
    );

    return null;
  }
};


export const simulateAllSensors = async () => {
  try {
    const sensors = await Sensor.find({
      status: "active",
    });

    if (!sensors.length) {
      console.log("⚠️  No active CEMS sensors found.");
      return [];
    }

    const readings = [];

    for (const sensor of sensors) {
      const reading = await simulateSensor(sensor);

      if (reading) {
        readings.push(reading);
      }
    }

    return readings;

  } catch (error) {
    console.error(
      "❌ Failed to simulate CEMS sensors:",
      error.message
    );

    return [];
  }
};