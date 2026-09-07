import { Router } from "express";
import { requireLogin } from "../middleware/auth.middleware";
import { getProfile, changePassword, changeProfileImage, showProfileImage } from "../controllers/user.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.get("/profile", requireLogin, getProfile);
router.get("/profile-image", requireLogin, showProfileImage);
router.put("/password", requireLogin, changePassword);
router.put("/profile-image", requireLogin, upload.single("profileImage"), changeProfileImage);

export default router;
