import path from "path";
import { fileURLToPath } from "url";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "../server/src");

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
