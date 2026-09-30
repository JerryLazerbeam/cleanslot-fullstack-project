import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { upload } from "../middleware/upload.middleware";
import {
  getProfile,
  changePassword,
  changeProfileImage,
  showProfileImage,
  createUserHandler,
  getOrganizationUsers,
  deleteUserHandler,
} from "../controllers/user.controller";

const router = Router();

router.get("/profile", requireLogin, getProfile);
router.get("/profile-image", requireLogin, showProfileImage);
router.put("/password", requireLogin, changePassword);
router.put(
  "/profile-image",
  requireLogin,
  upload.single("profileImage"),
  changeProfileImage,
);
router.get("/", requireLogin, requireAdmin, getOrganizationUsers);
router.post("/", requireLogin, requireAdmin, createUserHandler);

router.delete("/:id", requireLogin, requireAdmin, deleteUserHandler);

export default router;
