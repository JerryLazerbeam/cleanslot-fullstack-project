import { Request, Response } from "express";
import { getEquipment } from "../services/equipment.service";
import { getUserOrganization } from "../services/user.service";

export function getOrganizationEquipment(req: Request, res: Response) {
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

  const equipment = getEquipment(user.organization_id);

  return res.json(equipment);
}