import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import {
  getOrganizationEquipment,
  getAdminEquipment,
  updateEquipmentAvailability,
} from "../controllers/equipment.controller";

const router = Router();

router.get("/", requireLogin, getOrganizationEquipment);

// Admin
router.get("/admin", requireLogin, requireAdmin, getAdminEquipment);
router.patch(
  "/:id/availability",
  requireLogin,
  requireAdmin,
  updateEquipmentAvailability,
);

export default router;
