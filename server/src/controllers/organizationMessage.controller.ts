import { Request, Response } from "express";
import { getUserOrganization } from "../services/user.service";
import { createOrganizationMessage, getOrganizationMessages, } from "../services/organizationMessage.service";

export function createOrganizationMessageForOrganization(
  req: Request,
  res: Response,
) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      message: "Meddelande måste anges",
    });
  }

  const user = getUserOrganization(req.session.userId);

  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }

  try {
    const result = createOrganizationMessage(user.organization_id, message);

    return res.status(201).json({
      message: "Organisationsmeddelandet skapades",
      organizationMessageId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Kunde inte skapa organisationsmeddelande:", error);

    return res.status(500).json({
      message: "Kunde inte skapa organisationsmeddelande",
    });
  }
}

export function getMessagesForOrganization(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const user = getUserOrganization(req.session.userId);

  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }

  try {
    const messages = getOrganizationMessages(user.organization_id);

    return res.json(messages);
  } catch (error) {
    console.error("Kunde inte hämta organisationsmeddelanden:", error);

    return res.status(500).json({
      message: "Kunde inte hämta organisationsmeddelanden",
    });
  }
}
