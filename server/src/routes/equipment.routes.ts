import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { getOrganizationEquipment } from "../controllers/equipment.controller";

const router = Router();

router.get("/", requireLogin, getOrganizationEquipment);

export default router;