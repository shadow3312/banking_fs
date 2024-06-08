import { z } from "zod";

export const authFormSchema = (type: AuthType = "register") => {
  return z.object({
    email: z.string().email().trim(),
    password: z.string(),
    firstName:
      type === "login"
        ? z.string().optional()
        : z.string().min(3).max(20).trim(),
    lastName:
      type === "login"
        ? z.string().optional()
        : z.string().min(3).max(20).trim(),
    city:
      type === "login"
        ? z.string().optional()
        : z.string().min(3).max(40).trim(),
  });
};
