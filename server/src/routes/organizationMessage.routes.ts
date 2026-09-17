import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { createOrganizationMessageForOrganization, getMessagesForOrganization, } from "../controllers/organizationMessage.controller";

const router = Router();

router.get("/", requireLogin, getMessagesForOrganization);

router.post(
  "/",
  requireLogin,
  requireAdmin,
  createOrganizationMessageForOrganization,
);

export default router;
