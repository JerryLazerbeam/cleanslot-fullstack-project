import db from '../database';

export function getEquipment(organizationId: number) {
  const equipment = db
    .prepare(`
      SELECT equipment_id, name, is_available
      FROM equipment
      WHERE organization_id = ?
      ORDER BY equipment_id
    `)
    .all(organizationId);

  return equipment;
}

// Maskiner + antal felanmälningar som inte är åtgärdade
export function getEquipmentWithReports(organizationId: number) {
  return db
    .prepare(`
      SELECT
        equipment.equipment_id,
        equipment.name,
        equipment.is_available,
        COUNT(reports.report_id) AS open_reports
      FROM equipment
      LEFT JOIN report_equipment
        ON report_equipment.equipment_id = equipment.equipment_id
      LEFT JOIN reports
        ON reports.report_id = report_equipment.report_id
        AND reports.status != 'Åtgärdad'
      WHERE equipment.organization_id = ?
      GROUP BY equipment.equipment_id
      ORDER BY equipment.equipment_id
    `)
    .all(organizationId);
}

export function setEquipmentAvailability(
  equipmentId: number,
  organizationId: number,
  isAvailable: boolean,
) {
  return db
    .prepare(`
      UPDATE equipment
      SET is_available = ?
      WHERE equipment_id = ?
        AND organization_id = ?
    `)
    .run(isAvailable ? 1 : 0, equipmentId, organizationId);
}
