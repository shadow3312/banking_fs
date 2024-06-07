import JWTProvider from "@/infrastructure/providers/jwt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function makeAuthMiddleware({ userRepository }: IAuthMiddleware) {
  return async function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const jwtProvider = JWTProvider();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token is required" });
    }
    let token = authHeader;

    if (authHeader.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }

    try {
      const decoded = jwtProvider.verifyToken(token);

      if (typeof decoded === "string" || !decoded.id) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = await userRepository.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid token" });
      }
      next(error);
    }
  };
}
