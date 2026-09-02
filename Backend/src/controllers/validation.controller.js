import ValidationResult from "../models/ValidationResult.model.js";
import Alert from "../models/Alert.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { getActiveFactories, getLatestReadingByFactory } from "../services/cemsClient.service.js";
import { processFactoryReading } from "../services/pipeline.service.js";

// 1. Get Live Factory Statuses with Trust Scores (For Frontend Dashboard)
export const getLiveValidationDashboard = asyncHandler(async (req, res) => {
  const latestValidations = await ValidationResult.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$factoryId",
        latestRecord: { $first: "$$ROOT" },
      },
    },
    { $replaceRoot: { newRoot: "$latestRecord" } },
  ]);

  return res.status(200).json(
    new ApiResponse(200, latestValidations, "Live dashboard validation status fetched")
  );
});

// 2. Get Audit History for a Specific Factory
export const getFactoryAuditHistory = asyncHandler(async (req, res) => {
  const { factoryId } = req.params;
  const limit = parseInt(req.query.limit) || 50;

  const history = await ValidationResult.find({ factoryId })
    .sort({ createdAt: -1 })
    .limit(limit);

  return res.status(200).json(
    new ApiResponse(200, history, `Audit history for factory ${factoryId} fetched`)
  );
});

// 3. Get Active Tampering / Violation Alerts
export const getAlerts = asyncHandler(async (req, res) => {
  const alerts = await Alert.find({ isResolved: false }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, alerts, "Active alerts fetched successfully")
  );
});

// 4. Resolve an Alert
export const resolveAlert = asyncHandler(async (req, res) => {
  const { alertId } = req.params;
  const alert = await Alert.findByIdAndUpdate(
    alertId,
    { isResolved: true, resolvedAt: new Date() },
    { new: true }
  );

  if (!alert) {
    throw new ApiError(404, "Alert not found");
  }

  return res.status(200).json(
    new ApiResponse(200, alert, "Alert resolved successfully")
  );
});

// 5. On-Demand Manual Validation Trigger
export const triggerManualValidation = asyncHandler(async (req, res) => {
  const { factoryId } = req.params;
  const factories = await getActiveFactories();
  const factory = factories.find((f) => f.factoryId === factoryId);

  if (!factory) {
    throw new ApiError(404, "Factory not found in CEMS Server");
  }

  const latestReading = await getLatestReadingByFactory(factoryId);
  if (!latestReading) {
    throw new ApiError(404, "No recent telemetry reading found for factory");
  }

  const result = await processFactoryReading(latestReading, factory);

  return res.status(200).json(
    new ApiResponse(200, result, "Manual validation executed successfully")
  );
});