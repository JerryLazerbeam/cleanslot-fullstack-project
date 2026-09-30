import db from "../database";

export function createMessage(
  userId: number,
  message: string,
  title: string | null = null,
) {
  const statement = db.prepare(`
    INSERT INTO messages (user_id, title, message)
    VALUES (?, ?, ?)
  `);

  return statement.run(userId, title, message);
}

export function getMessages(userId: number) {
  const messages = db
    .prepare(
      `
      SELECT
        message_id,
        title,
        message,
        created_at,
        is_read
      FROM messages
      WHERE user_id = ?
      ORDER BY created_at DESC
    `,
    )
    .all(userId);

  return messages;
}

export function markMessageAsRead(messageId: number, userId: number) {
  const statement = db.prepare(`
    UPDATE messages
    SET is_read = 1
    WHERE message_id = ?
      AND user_id = ?
  `);

  return statement.run(messageId, userId);
}

// Skickar samma meddelande till alla boende i föreningen
export function createMessageForOrganization(
  organizationId: number,
  title: string,
  message: string,
) {
  const result = db
    .prepare(
      `
      INSERT INTO messages (user_id, title, message)
      SELECT user_id, ?, ?
      FROM users
      WHERE organization_id = ?
        AND role = 'user'
    `,
    )
    .run(title, message, organizationId);

  return result.changes;
}
