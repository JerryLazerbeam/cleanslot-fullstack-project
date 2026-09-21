import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import {
  createServiceReport,
  getOrganizationReports,
  deleteReportHandler,
  updateReportStatusHandler,
} from "../controllers/report.controller";

const router = Router();

router.post("/", requireLogin, createServiceReport);
router.get("/", requireLogin, requireAdmin, getOrganizationReports);
router.delete("/:id", requireLogin, requireAdmin, deleteReportHandler);
router.patch(
  "/:id/status",
  requireLogin,
  requireAdmin,
  updateReportStatusHandler,
);
export default router;
