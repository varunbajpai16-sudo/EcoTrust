import { runLayer1Validation } from "./validators.service.js";
import { runLayer2Agents, generateAISummary } from "./agents.service.js";
import { getFactoryHistoricalReadings } from "./cemsClient.service.js";
import ValidationResult from "../models/ValidationResult.model.js";
import SensorBaseline from "../models/SensorBaseline.model.js";
import Alert from "../models/Alert.model.js";

export const processFactoryReading = async (cemsReading, factory) => {
  if (!cemsReading) return null;

  const factoryId = factory.factoryId || cemsReading.factoryId?.factoryId || "UNKNOWN";
  const factoryName = factory.name || cemsReading.factoryId?.name || "Factory";
  const sensorId = cemsReading.sensorId?.sensorId || "SENSOR-01";

  // 1. Fetch recent history & baseline
  const pastReadings = await getFactoryHistoricalReadings(factoryId, 5);
  let baseline = await SensorBaseline.findOne({ sensorId });

  // 2. Run Layer 1 (Rules)
  const l1 = runLayer1Validation(cemsReading, pastReadings);

  // 3. Run Layer 2 (Cross-Correlation & History)
  const l2 = runLayer2Agents(cemsReading, baseline, factory);

  // 4. Calculate Final Trust Score (0 - 100)
  const totalDeduction = l1.scoreDeduction + l2.scoreDeduction;
  const trustScore = Math.max(0, 100 - totalDeduction);
  const allFlags = [...l1.flags, ...l2.flags];

  // 5. Determine Verdict
  let verdict = "VERIFIED";
  if (allFlags.includes("BYPASS_TAMPERING_DETECTED") || allFlags.includes("SENSOR_FROZEN_FLATLINE")) {
    verdict = "TAMPERED";
  } else if (allFlags.includes("SENSOR_HEALTH_DEGRADED") || allFlags.includes("CALIBRATION_EXPIRED")) {
    verdict = "FAULTY_SENSOR";
  } else if (trustScore < 70) {
    verdict = "SUSPICIOUS";
  }

  // 6. Run Layer 3 (Groq AI Summarizer)
  const aiSummary = await generateAISummary(
    factoryName,
    trustScore,
    verdict,
    allFlags,
    { l1: l1.checks, l2: l2.checks }
  );

  // 7. Save ValidationResult to MongoDB
  const validationRecord = await ValidationResult.create({
    factoryId,
    factoryName,
    sensorId,
    readingTimestamp: cemsReading.timestamp || new Date(),
    rawReading: {
      pollutants: cemsReading.pollutants,
      temperature: cemsReading.temperature,
      pressure: cemsReading.pressure,
      flowRate: cemsReading.flowRate,
      electricityConsumption: factory.electricityConsumption,
    },
    trustScore,
    verdict,
    layer1Checks: l1.checks,
    layer2Checks: l2.checks,
    aiSummary,
    failedFlags: allFlags,
  });

  // 8. Create Alert if Critical / Tampered
  if (verdict === "TAMPERED" || verdict === "SUSPICIOUS" || trustScore < 60) {
    const severity = verdict === "TAMPERED" || trustScore < 40 ? "CRITICAL" : "HIGH";
    await Alert.create({
      factoryId,
      factoryName,
      sensorId,
      severity,
      title: `${verdict}: Irregularity at ${factoryName}`,
      description: aiSummary,
      aiExplanation: aiSummary,
      flags: allFlags,
    });
  }

  // 9. Update Baseline Stats (Rolling Average)
  if (trustScore >= 80 && cemsReading.pollutants) {
    if (!baseline) {
      baseline = new SensorBaseline({ sensorId, factoryId });
    }
    for (const key of ["pm25", "so2", "nox", "co"]) {
      const val = cemsReading.pollutants[key];
      if (val !== undefined && val !== null) {
        const curr = baseline.stats[key] || { avg: val, stdDev: 5, count: 1 };
        curr.avg = (curr.avg * curr.count + val) / (curr.count + 1);
        curr.count += 1;
        baseline.stats[key] = curr;
      }
    }
    baseline.lastUpdated = new Date();
    await baseline.save();
  }

  return validationRecord;
};