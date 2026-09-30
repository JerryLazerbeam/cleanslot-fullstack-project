import { Request, Response } from "express";
import {
  createMessage,
  getMessages,
  markMessageAsRead,
  createMessageForOrganization,
} from "../services/message.service";
import { getUserOrganization } from "../services/user.service";
import { deliverDueReminders } from "../services/reminder.service";

export function createUserMessage(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const { userId, message, title } = req.body;

  if (!userId || !message) {
    return res.status(400).json({
      message: "Användare och meddelande måste anges",
    });
  }

  try {
    const result = createMessage(userId, message, title ?? null);

    return res.status(201).json({
      message: "Meddelandet skickades",
      messageId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Kunde inte skapa meddelande:", error);

    return res.status(500).json({
      message: "Kunde inte skapa meddelande",
    });
  }
}

export function getUserMessages(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  deliverDueReminders(req.session.userId);

  const messages = getMessages(req.session.userId);

  return res.json(messages);
}

export function markUserMessageAsRead(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const messageId = Number(req.params.messageId);

  if (!messageId) {
    return res.status(400).json({
      message: "Message ID saknas",
    });
  }

  const result = markMessageAsRead(messageId, req.session.userId);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "Meddelandet hittades inte",
    });
  }

  return res.json({
    message: "Meddelandet markerades som läst",
  });
}

export function broadcastMessage(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const { title, message } = req.body;

  if (!title || !String(title).trim() || !message || !String(message).trim()) {
    return res
      .status(400)
      .json({ message: "Rubrik och meddelande måste anges" });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({ message: "Användaren hittades inte" });
  }

  const count = createMessageForOrganization(
    admin.organization_id,
    String(title).trim(),
    String(message).trim(),
  );

  return res.status(201).json({
    message: `Meddelandet skickades till ${count} boende`,
  });
}
