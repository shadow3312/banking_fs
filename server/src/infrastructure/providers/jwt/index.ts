import env from "@/serverEnv";
import jwt from "jsonwebtoken";

const secret = env.JWT_SECRET;

export default function JWTProvider(): IJWTProvider {
  return Object.freeze({
    generateToken,
    verifyToken,
  });

  function generateToken(payload: object) {
    return jwt.sign(payload, secret);
  }
  function verifyToken(token: string) {
    return jwt.verify(token, secret) as IJwtPayload;
  }
}
