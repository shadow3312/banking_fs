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

export const transferFormSchema = z.object({
  destinationFundingSource: z
    .string()
    .min(6, { message: "The public id must have at least 6 characters" }),
  amount: z.coerce
    .number()
    .gte(10, { message: "The amount cannot be lower than 10 USD" }),
  note: z
    .string()
    .min(4, { message: "Transfer not must have at least 4 characters" }),
  email: z.string().email().trim(),
});
