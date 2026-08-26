import Alert from "../models/Alert.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// 1. Get All Active (Unresolved) Alerts
export const getActiveAlerts = asyncHandler(async (req, res) => {
  const { severity, factoryId } = req.query;

  const filter = { isResolved: false };
  if (severity) filter.severity = severity.toUpperCase();
  if (factoryId) filter.factoryId = factoryId;

  const alerts = await Alert.find(filter).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, alerts, "Active alerts fetched successfully")
  );
});

// 2. Get Alert Summary / Stats (Dashboard ke Badges & Counters ke liye)
export const getAlertStats = asyncHandler(async (req, res) => {
  const stats = await Alert.aggregate([
    {
      $group: {
        _id: "$severity",
        count: { $sum: 1 },
        unresolvedCount: {
          $sum: { $cond: [{ $eq: ["$isResolved", false] }, 1, 0] },
        },
      },
    },
  ]);

  const totalUnresolved = await Alert.countDocuments({ isResolved: false });

  return res.status(200).json(
    new ApiResponse(
      200,
      { totalUnresolved, breakdown: stats },
      "Alert statistics fetched successfully"
    )
  );
});

// 3. Mark Alert as Resolved
export const resolveAlert = asyncHandler(async (req, res) => {
  const { alertId } = req.params;

  const alert = await Alert.findByIdAndUpdate(
    alertId,
    {
      isResolved: true,
      resolvedAt: new Date(),
    },
    { new: true }
  );

  if (!alert) {
    throw new ApiError(404, "Alert not found with the given ID");
  }

  return res.status(200).json(
    new ApiResponse(200, alert, "Alert marked as resolved successfully")
  );
});