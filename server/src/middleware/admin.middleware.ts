import { Request, Response, NextFunction } from "express";
import db from "../database";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const user = db
    .prepare(
      `
      SELECT role
      FROM users
      WHERE user_id = ?
    `,
    )
    .get(req.session.userId) as { role: string } | undefined;

  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      message: "Du har inte behörighet",
    });
  }

  next();
}
