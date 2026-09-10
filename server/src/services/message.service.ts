import db from "../database";

export function createMessage(userId: number, message: string) {
  const statement = db.prepare(`
    INSERT INTO messages (user_id, message)
    VALUES (?, ?)
  `);

  return statement.run(userId, message);
}

export function getMessages(userId: number) {
  const messages = db
    .prepare(
      `
      SELECT
        message_id,
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
