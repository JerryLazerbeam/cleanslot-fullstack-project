import { Request, Response } from "express";
import { getUserOrganization } from "../services/user.service";
import { getRules, updateRules } from "../services/rules.service";

export function getOrganizationRules(req: Request, res: Response) {
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
    const rules = getRules(user.organization_id);

    return res.json(rules);
  } catch (error) {
    console.error("Kunde inte hämta regler:", error);

    return res.status(500).json({
      message: "Kunde inte hämta regler",
    });
  }
}

export function updateOrganizationRules(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      message: "Regeltext måste anges",
    });
  }

  const user = getUserOrganization(req.session.userId);

  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }

  try {
    const result = updateRules(user.organization_id, content);

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Det finns inga regler för organisationen",
      });
    }

    return res.json({
      message: "Reglerna uppdaterades",
    });
  } catch (error) {
    console.error("Kunde inte uppdatera regler:", error);

    return res.status(500).json({
      message: "Kunde inte uppdatera regler",
    });
  }
}
