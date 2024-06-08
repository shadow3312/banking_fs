import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import superjson from "superjson";
import JWTProvider from "@/infrastructure/providers/jwt";
// import { middleware } from "./trpc";
import { TRPCError } from "@trpc/server";
import userRepository from "@/infrastructure/data/repositories/user";

export interface IContext {
  user?: IJwtPayload;
}

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];
  return { req, res, token };
};
type Context = Awaited<ReturnType<typeof createContext>> & IContext;

const t = initTRPC.context<Context>().create({ transformer: superjson });

const { router, middleware, createCallerFactory } = t;
export { router, createCallerFactory, middleware };
export const publicProcedure = t.procedure;

export const authMiddleware = middleware(async ({ ctx, next }) => {
  const jwtProvider = JWTProvider();

  const authHeader = ctx.req.headers.authorization;

  if (!authHeader) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Token is required" });
  }
  let token = authHeader;

  if (authHeader.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimStart();
  }

  try {
    const decoded = jwtProvider.verifyToken(token);

    if (typeof decoded === "string" || !decoded.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
    }

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
    }

    ctx.user = decoded;
  } catch (error) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
  }
  return next();
});

// export const protectedProcedure = publicProcedure.use(authMiddleware);
