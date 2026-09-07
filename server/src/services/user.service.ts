import db from "../database";

export function getUserById(userId: number) {
  const user = db
    .prepare(
      `
      SELECT user_id, username
      FROM users
      WHERE user_id = ?
    `,
    )
    .get(userId) as
    | {
        user_id: number;
        username: string;
      }
    | undefined;

  return user;
}
