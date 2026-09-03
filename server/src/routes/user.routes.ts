import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { getProfile } from "../controllers/user.controller";

const router = Router();

router.get("/profile", requireLogin, getProfile);

export default router;
