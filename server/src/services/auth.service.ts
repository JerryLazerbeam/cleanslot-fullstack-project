import db from "../database";

export function loginUser(username: string, password: string) {
  const user = db
    .prepare(
      `
            SELECT user_id, username, password
            FROM users
            WHERE username = ?
        `,
    )
    .get(username) as
    | {
        user_id: number;
        username: string;
        password: string;
      }
    | undefined;
  if (!user) {
    return null;
  }
  if (user.password !== password) {
    return null;
  }
  return user;
}

