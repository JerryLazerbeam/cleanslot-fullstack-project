import { Request, Response } from "express";
import {
  getUserById,
  updatePassword,
  updateProfileImage,
  getProfileImage,
} from "../services/user.service";

export function getProfile(req: Request, res: Response) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }
  const user = getUserById(userId);
  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }
  res.json({
    userId: user.user_id,
    username: user.username,
  });
}
export function changePassword(req: Request, res: Response) {
  const { newPassword } = req.body;

  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }
  if (!newPassword) {
    return res.status(400).json({
      message: "Nytt lösenord saknas",
    });
  }
  updatePassword(req.session.userId, newPassword);
  res.json({
    message: "Lösenordet har ändrats",
  });
}
export function changeProfileImage(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Ingen bild skickades",
    });
  }

  updateProfileImage(req.session.userId, req.file.buffer, req.file.mimetype);

  res.json({
    message: "Profilbilden har sparats",
  });
}
export function showProfileImage(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const user = getProfileImage(req.session.userId);

  if (!user || !user.profile_image || !user.profile_image_type) {
    return res.status(404).json({
      message: "Ingen profilbild hittades",
    });
  }

  res.setHeader("Content-Type", user.profile_image_type);

  res.send(user.profile_image);
}
