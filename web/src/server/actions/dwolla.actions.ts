"use server";

import { env } from "@/env";
import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = env.DWOLLA_ENV;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`",
      );
  }
};

const dwolla = new Client({
  environment: getEnvironment(),
  key: env.DWOLLA_KEY,
  secret: env.DWOLLA_SECRET,
});

export const createDwollaCustomer = async (customer: IDwollaCustomer) => {
  try {
    const response = await dwolla.post("customers", customer);

    return response.headers.get("location");
  } catch (error) {
    console.log(`Failed to create dwolla customer ${error}`);
  }
};
