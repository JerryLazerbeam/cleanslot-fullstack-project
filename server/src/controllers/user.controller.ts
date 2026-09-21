import { Request, Response } from "express";
import {
  getUserById,
  updatePassword,
  updateProfileImage,
  getProfileImage,
  getUserOrganization,
  createUser,
  getUsersByOrganization,
  deleteUser,
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
    role: user.role,
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
const ALLOWED_ROLES = ["user", "admin"];

export function createUserHandler(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const { username, password, role,  phone, email } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      message: "Namn, lösenord, telefon, e-post och roll måste fyllas i",
    });
  }

  if (!ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({
      message: "Ogiltig roll",
    });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }

  try {
    const userId = createUser(username, password, phone, email, role, admin.organization_id);

    return res.status(201).json({
      message: "Användare skapad",
      userId,
    });
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        message: "Användarnamnet är upptaget",
      });
    }

    console.error("Kunde inte skapa användare:", error);

    return res.status(500).json({
      message: "Kunde inte skapa användare",
    });
  }
}

export function getOrganizationUsers(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }

  try {
    const users = getUsersByOrganization(admin.organization_id);

    return res.json(users);
  } catch (error) {
    console.error("Kunde inte hämta användare:", error);

    return res.status(500).json({
      message: "Kunde inte hämta användare",
    });
  }
}
export function deleteUserHandler(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const userId = Number(req.params.id);

  if (Number.isNaN(userId)) {
    return res.status(400).json({
      message: "Ogiltigt id",
    });
  }

  try {
    const deletedRows = deleteUser(userId);

    if (deletedRows === 0) {
      return res.status(404).json({
        message: "Användaren hittades inte",
      });
    }

    return res.status(200).json({
      message: "Användaren borttagen",
    });
  } catch (error) {
    console.error("Kunde inte ta bort användare:", error);

    return res.status(500).json({
      message: "Kunde inte ta bort användare",
    });
  }
}
