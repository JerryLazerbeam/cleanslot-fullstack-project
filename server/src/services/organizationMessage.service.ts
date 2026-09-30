import db from "../database";

export function createOrganizationMessage(
  organizationId: number,
  message: string,
) {
  const statement = db.prepare(`
    INSERT INTO organization_messages (
      organization_id,
      message
    )
    VALUES (?, ?)
  `);

  return statement.run(organizationId, message);
}

export function getOrganizationMessages(organizationId: number) {
  const messages = db
    .prepare(
      `
      SELECT
        organization_message_id,
        message,
        created_at
      FROM organization_messages
      WHERE organization_id = ?
      ORDER BY created_at DESC
    `,
    )
    .all(organizationId);

  return messages;
}
