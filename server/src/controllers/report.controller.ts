import { Request, Response } from "express";
import db from "../database";
import { getUserOrganization } from "../services/user.service";
import { createReport, getReports, deleteReport, updateReportStatus  } from "../services/report.service";

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
      SELECT equipment_id, is_available
      FROM equipment
      WHERE organization_id = ?
    `,
    )
    .all(user.organization_id) as {
    equipment_id: number;
    is_available: number;
  }[];

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

  const unavailableSelected = equipmentRows.some(
    (item) => item.is_available === 0 && equipment.includes(item.equipment_id),
  );

  if (unavailableSelected) {
    return res.status(400).json({
      message: "Maskinen är redan felanmäld och ur funktion",
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
export function deleteReportHandler(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const reportId = Number(req.params.id);

  if (Number.isNaN(reportId)) {
    return res.status(400).json({
      message: "Ogiltigt id",
    });
  }

  try {
    const deletedRows = deleteReport(reportId);

    if (deletedRows === 0) {
      return res.status(404).json({
        message: "Felanmälan hittades inte",
      });
    }

    return res.status(200).json({
      message: "Felanmälan borttagen",
    });
  } catch (error) {
    console.error("Kunde inte ta bort felanmälan:", error);

    return res.status(500).json({
      message: "Kunde inte ta bort felanmälan",
    });
  }
}
const ALLOWED_STATUSES = ["Ny", "Pågående", "Åtgärdad"];

export function updateReportStatusHandler(req: Request, res: Response) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Du måste vara inloggad",
    });
  }

  const reportId = Number(req.params.id);
  const { status } = req.body;

  if (Number.isNaN(reportId)) {
    return res.status(400).json({
      message: "Ogiltigt id",
    });
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({
      message: "Ogiltig status",
    });
  }

  try {
    const updatedRows = updateReportStatus(reportId, status);

    if (updatedRows === 0) {
      return res.status(404).json({
        message: "Felanmälan hittades inte",
      });
    }

    return res.status(200).json({
      message: "Status uppdaterad",
    });
  } catch (error) {
    console.error("Kunde inte uppdatera status:", error);

    return res.status(500).json({
      message: "Kunde inte uppdatera status",
    });
  }
}
