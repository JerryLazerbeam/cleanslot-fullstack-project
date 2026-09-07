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
export function updatePassword(userId: number, newPassword: string) {
  const statement = db.prepare(`
    UPDATE users
    SET password = ?
    WHERE user_id = ?
  `);

  return statement.run(newPassword, userId);
}
export function updateProfileImage(
  userId: number,
  image: Buffer,
  imageType: string,
) {
  const statement = db.prepare(`
    UPDATE users
    SET profile_image = ?,
        profile_image_type = ?
    WHERE user_id = ?
  `);

  return statement.run(image, imageType, userId);
}
export function getProfileImage(userId: number) {
  const user = db
    .prepare(`
      SELECT profile_image, profile_image_type
      FROM users
      WHERE user_id = ?
    `)
    .get(userId) as
    | {
        profile_image: Buffer | null;
        profile_image_type: string | null;
      }
    | undefined;

  return user;
}