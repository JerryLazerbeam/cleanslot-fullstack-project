import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { createServiceReport, getOrganizationReports, } from "../controllers/report.controller";

const router = Router();

router.post("/", requireLogin, createServiceReport);
router.get("/", requireLogin, requireAdmin, getOrganizationReports);

export default router;