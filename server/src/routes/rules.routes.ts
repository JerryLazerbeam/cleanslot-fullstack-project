import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { getOrganizationRules, updateOrganizationRules, } from "../controllers/rules.controller";

const router = Router();

router.get("/", requireLogin, getOrganizationRules);

router.put("/", requireLogin, requireAdmin, updateOrganizationRules);

export default router;
