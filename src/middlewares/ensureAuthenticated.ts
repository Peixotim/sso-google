import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // 1. Tenta pegar do Cookie (Prioridade no seu novo fluxo)
  let token = req.cookies.token;

  // (Opcional) Fallback: Se não tiver cookie, tenta pegar do Header (caso teste via Postman/Insomnia sem cookie)
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { id, role, email } = decoded as TokenPayload;

    // Injeta os dados no request para usar nos controllers
    req.user = { id, role, email }; // Certifique-se de ter estendido a tipagem do Express

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
}
