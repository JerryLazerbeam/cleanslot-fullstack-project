import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";

export function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = loginUser(username, password);

  if (!user) {
    return res.status(401).json({
      message: "Fel användarnamn eller lösenord",
    });
  }
  req.session.userId = user.user_id;
  return res.json({
    message: "Inloggning lyckades",
  });
}
export function logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "Kunde inte logga ut",
      });
    }

    res.json({
      message: "Utloggning lyckades",
    });
  });
}
