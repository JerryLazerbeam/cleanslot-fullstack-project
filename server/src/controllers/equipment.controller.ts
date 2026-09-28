import { Request, Response } from "express";
import {
  getEquipment,
  getEquipmentWithReports,
  setEquipmentAvailability,
} from "../services/equipment.service";
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

export function getAdminEquipment(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({ message: "Användaren hittades inte" });
  }

  return res.json(getEquipmentWithReports(admin.organization_id));
}

export function updateEquipmentAvailability(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Du måste vara inloggad" });
  }

  const equipmentId = Number(req.params.id);
  const { isAvailable } = req.body;

  if (Number.isNaN(equipmentId) || typeof isAvailable !== "boolean") {
    return res.status(400).json({ message: "Ogiltig förfrågan" });
  }

  const admin = getUserOrganization(req.session.userId);

  if (!admin) {
    return res.status(404).json({ message: "Användaren hittades inte" });
  }

  const result = setEquipmentAvailability(
    equipmentId,
    admin.organization_id,
    isAvailable,
  );

  if (result.changes === 0) {
    return res.status(404).json({ message: "Maskinen hittades inte" });
  }

  return res.json({
    message: isAvailable
      ? "Maskinen är tillgänglig igen"
      : "Maskinen är markerad som ur funktion",
  });
}
