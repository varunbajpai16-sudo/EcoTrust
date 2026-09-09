import { Router } from "express";
import {
  getLiveValidationDashboard,
  getFactoryAuditHistory,
  getAlerts,
  resolveAlert,
  triggerManualValidation,
} from "../controllers/validation.controller.js";

const router = Router();

router.get("/dashboard/live", getLiveValidationDashboard);
router.get("/factory/:factoryId/history", getFactoryAuditHistory);
router.get("/alerts", getAlerts);
router.patch("/alerts/:alertId/resolve", resolveAlert);
router.post("/factory/:factoryId/trigger", triggerManualValidation);

export default router;