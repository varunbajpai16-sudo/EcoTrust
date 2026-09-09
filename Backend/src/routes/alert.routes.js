import { Router } from "express";
import {
  getActiveAlerts,
  getAlertStats,
  resolveAlert,
} from "../controllers/alert.controller.js";

const router = Router();

// Route: /api/v1/alerts
router.get("/", getActiveAlerts);
router.get("/stats", getAlertStats);
router.patch("/:alertId/resolve", resolveAlert);

export default router;