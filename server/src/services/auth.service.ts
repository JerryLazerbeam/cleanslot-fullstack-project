import db from "../database";
import { verifyPassword } from "./password.service";

export function loginUser(username: string, password: string) {
  const user = db
    .prepare(
      `
            SELECT user_id, username, password, role
            FROM users
            WHERE username = ?
        `,
    )
    .get(username) as
    | {
        user_id: number;
        username: string;
        password: string;
        role: string;
      }
    | undefined;
  if (!user) {
    return null;
  }
  if (!verifyPassword(password, user.password)) {
    return null;
  }
  return user;
}
