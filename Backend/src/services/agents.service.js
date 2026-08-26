import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// ==========================================
// LAYER 2: Cross-Correlation Agent Checks
// ==========================================
export const runLayer2Agents = (currentReading, baseline, factory) => {
  const flags = [];
  let scoreDeduction = 0;
  const pollutants = currentReading.pollutants || {};
  const electricity = factory?.electricityConsumption || 0;
  const capacity = factory?.productionCapacity || 100;

  // 1. Electricity vs Emission Correlation (Bypass / Cheat Detection)
  // If factory load > 60% capacity but SO2 or NOx is ~ 0 -> Major Fraud Alert
  let elecPassed = true;
  let elecDetails = "Emissions correlate logically with power consumption";

  const loadPercent = capacity > 0 ? (electricity / capacity) * 100 : 0;
  const isOperatingHeavy = loadPercent > 40;
  const zeroEmissions = (pollutants.so2 || 0) < 2 && (pollutants.nox || 0) < 2 && (pollutants.pm25 || 0) < 2;

  if (isOperatingHeavy && zeroEmissions) {
    elecPassed = false;
    elecDetails = `Factory power load is high (${electricity} kW), but emission levels are near-zero. Strong likelihood of bypass duct or sensor cheating.`;
    flags.push("BYPASS_TAMPERING_DETECTED");
    scoreDeduction += 45; // Huge penalty
  }

  // 2. Historical Baseline Statistical Deviation (Z-Score)
  let baselinePassed = true;
  let baselineDetails = "Within 3-sigma historical baseline";
  if (baseline && baseline.stats) {
    for (const key of ["so2", "pm25", "nox"]) {
      const stat = baseline.stats[key];
      const val = pollutants[key];
      if (stat && stat.stdDev > 0 && val !== null && val !== undefined) {
        const zScore = Math.abs((val - stat.avg) / stat.stdDev);
        if (zScore > 3.5) {
          baselinePassed = false;
          baselineDetails = `${key.toUpperCase()} value (${val}) deviates significantly from historical baseline (avg: ${stat.avg.toFixed(1)}, z-score: ${zScore.toFixed(1)})`;
          flags.push(`BASELINE_ANOMALY_${key.toUpperCase()}`);
          scoreDeduction += 20;
        }
      }
    }
  }

  // 3. Multi-Gas Ratio Anomaly (e.g. In combustion, SO2 and NOx usually scale together)
  let multiGasPassed = true;
  let multiGasDetails = "Gas ratios conform to standard combustion stoichiometry";
  if (pollutants.nox > 200 && (pollutants.so2 || 0) === 0) {
    multiGasPassed = false;
    multiGasDetails = "High NOx with 0 SO2 detected in coal/heavy combustion unit.";
    flags.push("UNNATURAL_GAS_RATIO");
    scoreDeduction += 15;
  }

  return {
    checks: {
      electricityCorrelationCheck: { passed: elecPassed, details: elecDetails },
      historicalDeviationCheck: { passed: baselinePassed, details: baselineDetails },
      multiGasCorrelationCheck: { passed: multiGasPassed, details: multiGasDetails },
    },
    flags,
    scoreDeduction,
  };
};

// ==========================================
// LAYER 3: Groq LLM Summarizer Agent
// ==========================================
export const generateAISummary = async (factoryName, trustScore, verdict, allFlags, details) => {
  // If no flags and trustScore is high, quick clean summary
  if (allFlags.length === 0 && trustScore >= 90) {
    return "All CEMS emission telemetry verified successfully. Data aligns with power consumption and historical baselines with zero tampering flags.";
  }

  if (!process.env.GROQ_API_KEY) {
    return `Trust Score: ${trustScore}/100. Flags detected: ${allFlags.join(", ")}. Immediate auditor inspection recommended.`;
  }

  try {
    const prompt = `
You are an expert Environmental CEMS (Continuous Emission Monitoring System) AI Auditor for EcoTrust.
Analyze this validation incident and generate a concise 2-sentence explanation for pollution control officers:

Factory: ${factoryName}
Calculated Trust Score: ${trustScore}/100
Verdict: ${verdict}
Failed Checks & Flags: ${JSON.stringify(allFlags)}
Technical Details: ${JSON.stringify(details)}

Provide a direct, professional, factual explanation. If tampering or bypass is suspected, highlight it clearly.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_tokens: 150,
    });

    return chatCompletion.choices[0]?.message?.content?.trim() || "Analysis completed with detected anomalies.";
  } catch (error) {
    console.error("Groq AI Summary Generation Error:", error.message);
    return `Automated Rule Audit: Trust score degraded to ${trustScore}/100 due to [${allFlags.join(", ")}].`;
  }
};