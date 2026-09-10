import { Request, Response } from "express";
import db from "../database";
import { getUserOrganization } from "../services/user.service";
import { createReport, getReports } from "../services/report.service";

export function createServiceReport(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const { phone, email, equipment, description } = req.body;

  if (!phone || !email || !description) {
    return res.status(400).json({
      message: "Telefon, e-post och beskrivning måste fyllas i",
    });
  }

  if (!Array.isArray(equipment) || equipment.length === 0) {
    return res.status(400).json({
      message: "Du måste välja minst en utrustning",
    });
  }

  const user = getUserOrganization(req.session.userId);

  if (!user) {
    return res.status(404).json({
      message: "Användaren hittades inte",
    });
  }

  const equipmentRows = db
    .prepare(
      `
      SELECT equipment_id
      FROM equipment
      WHERE organization_id = ?
    `,
    )
    .all(user.organization_id) as { equipment_id: number }[];

  const organizationEquipmentIds = equipmentRows.map(
    (item) => item.equipment_id,
  );

  const allEquipmentBelongsToOrganization = equipment.every(
    (equipmentId: number) => organizationEquipmentIds.includes(equipmentId),
  );

  if (!allEquipmentBelongsToOrganization) {
    return res.status(403).json({
      message: "Du kan inte välja utrustning från en annan förening",
    });
  }

  try {
    const reportId = createReport(
      req.session.userId,
      phone,
      email,
      equipment,
      description,
    );

    return res.status(201).json({
      message: "Felanmälan skickad",
      reportId,
    });
  } catch (error) {
    console.error("Kunde inte skapa felanmälan:", error);

    return res.status(500).json({
      message: "Kunde inte skapa felanmälan",
    });
  }
}

export function getOrganizationReports(req: Request, res: Response) {
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
    const reports = getReports(user.organization_id);

    return res.json(reports);
  } catch (error) {
    console.error("Kunde inte hämta felanmälningar:", error);

    return res.status(500).json({
      message: "Kunde inte hämta felanmälningar",
    });
  }
}
