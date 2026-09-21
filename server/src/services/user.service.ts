import db from "../database";

export function getUserById(userId: number) {
  const user = db
    .prepare(
      `
      SELECT user_id, username, role
      FROM users
      WHERE user_id = ?
    `,
    )
    .get(userId) as
    | {
        user_id: number;
        username: string;
        role: string;
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
    .prepare(
      `
      SELECT profile_image, profile_image_type
      FROM users
      WHERE user_id = ?
    `,
    )
    .get(userId) as
    | {
        profile_image: Buffer | null;
        profile_image_type: string | null;
      }
    | undefined;

  return user;
}

export function getUserOrganization(userId: number) {
  const user = db
    .prepare(
      `
      SELECT organization_id
      FROM users
      WHERE user_id = ?
    `,
    )
    .get(userId) as
    | {
        organization_id: number;
      }
    | undefined;
    return user;
}

 export function createUser(
    username: string,
    password: string,
    phone: string, 
    email: string,
    role: string,
    organizationId: number,
  ) {
    const result = db
      .prepare(
        `
      INSERT INTO users (username, password, organization_id, role,  phone, email)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      )
      .run(username, password, organizationId, role, phone, email);

    return Number(result.lastInsertRowid);
  }

 export function getUsersByOrganization(organizationId: number) {
    return db
      .prepare(
        `
      SELECT user_id, username, role,  phone, email
      FROM users
      WHERE organization_id = ?
      ORDER BY username
    `,
      )
      .all(organizationId);
  }
  export function deleteUser(userId: number) {
  const result = db.prepare(`DELETE FROM users WHERE user_id = ?`).run(userId);

  return result.changes;
}
  
