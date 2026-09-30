import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import {
  createUserMessage,
  getUserMessages,
  markUserMessageAsRead,
  broadcastMessage,
} from "../controllers/message.controller";

const router = Router();

router.get("/", requireLogin, getUserMessages);

router.post("/", requireLogin, requireAdmin, createUserMessage);

router.post("/broadcast", requireLogin, requireAdmin, broadcastMessage);

router.put("/:messageId/read", requireLogin, markUserMessageAsRead);

export default router;
