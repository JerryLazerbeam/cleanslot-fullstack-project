import db from '../database';

export function getEquipment(organizationId: number) {
  const equipment = db
    .prepare(`
      SELECT equipment_id, name
      FROM equipment
      WHERE organization_id = ?
      ORDER BY equipment_id
    `)
    .all(organizationId);

  return equipment;
}