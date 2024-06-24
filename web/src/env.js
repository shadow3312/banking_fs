import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side env
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    NEXT_API_URL: z.string(),
    PLAID_CLIENT_ID: z.string(),
    PLAID_SECRET: z.string(),
    PLAID_ENV: z.string(),
    PLAID_PRODUCTS: z.string(),
    DWOLLA_KEY: z.string(),
    DWOLLA_SECRET: z.string(),
    DWOLLA_BASE_URL: z.string(),
    DWOLLA_ENV: z.string(),
    PLAID_COUNTRY_CODES: z.string(),
  },

  /**
   Clien side env
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_API_URL: process.env.NEXT_API_URL,
    DWOLLA_BASE_URL: process.env.DWOLLA_BASE_URL,
    DWOLLA_ENV: process.env.DWOLLA_ENV,
    DWOLLA_KEY: process.env.DWOLLA_KEY,
    DWOLLA_SECRET: process.env.DWOLLA_SECRET,
    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    PLAID_ENV: process.env.PLAID_ENV,
    PLAID_PRODUCTS: process.env.PLAID_PRODUCTS,
    PLAID_SECRET: process.env.PLAID_SECRET,
    PLAID_COUNTRY_CODES: process.env.PLAID_COUNTRY_CODES,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
