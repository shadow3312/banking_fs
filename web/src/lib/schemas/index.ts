import { z } from "zod";

export const authFormSchema = (type: AuthType = "register") => {
  return z.object({
    email: z.string().email().trim(),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters" }),
    firstName:
      type === "login"
        ? z.string().optional()
        : z
            .string()
            .min(3, { message: "First name must have at least 3 characters" })
            .max(20)
            .trim(),
    lastName:
      type === "login"
        ? z.string().optional()
        : z
            .string()
            .min(3, { message: "Last name must have at least 3 characters" })
            .max(20)
            .trim(),
    city:
      type === "login"
        ? z.string().optional()
        : z
            .string()
            .min(3, { message: "City name must have at least 3 characters" })
            .max(40)
            .trim(),
  });
};
