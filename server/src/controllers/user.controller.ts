import { Request, Response } from "express";
import { getUserById } from "../services/user.service";

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
