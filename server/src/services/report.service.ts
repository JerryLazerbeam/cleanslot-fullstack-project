import db from "../database";

export function createReport(
  userId: number,
  phone: string,
  email: string,
  equipmentIds: number[],
  description: string,
) {
  const createReportTransaction = db.transaction(() => {
    const reportResult = db
      .prepare(
        `
        INSERT INTO reports (
          user_id,
          phone,
          email,
          description
        )
        VALUES (?, ?, ?, ?)
      `,
      )
      .run(userId, phone, email, description);

    const reportId = Number(reportResult.lastInsertRowid);

    const insertEquipment = db.prepare(`
      INSERT INTO report_equipment (
        report_id,
        equipment_id
      )
      VALUES (?, ?)
    `);

    for (const equipmentId of equipmentIds) {
      insertEquipment.run(reportId, equipmentId);
    }

    return reportId;
  });
  return createReportTransaction();
}
export function getReports(organizationId: number) {
  const reports = db
    .prepare(
      `
      SELECT
        reports.report_id,
        reports.user_id,
        users.username,
        reports.phone,
        reports.email,
        reports.description,
        reports.created_at,
        GROUP_CONCAT(equipment.name, ', ') AS equipment
      FROM reports
      JOIN users
        ON reports.user_id = users.user_id
      JOIN report_equipment
        ON reports.report_id = report_equipment.report_id
      JOIN equipment
        ON report_equipment.equipment_id = equipment.equipment_id
      WHERE users.organization_id = ?
      GROUP BY reports.report_id
      ORDER BY reports.created_at DESC
    `,
    )
    .all(organizationId);

  return reports;
}
