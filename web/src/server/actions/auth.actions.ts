"use server";

import { api } from "@/trpc/server";
import { createDwollaCustomer } from "./dwolla.actions";
import { signIn } from "next-auth/react";
import { extractCustomerId } from "@/lib/utils";

export async function registerUser(userPayload: IRegisterPayload) {
  try {
    const { email, password } = userPayload;

    // First create the dwolla customer to generate the customerUrl
    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userPayload,
      type: "personal",
    });

    if (!dwollaCustomerUrl) throw new Error(`Failed to create dwolla customer`);

    // Next extract the id from the customerUrl

    const dwollaCustomerId = extractCustomerId(dwollaCustomerUrl);

    if (!dwollaCustomerId) {
      throw new Error(`Failed to extract dwolla customer id`);
    }

    const user = await api.auth.register.mutate({
      ...userPayload,
      dwollaCustomerUrl,
      dwollaCustomerId,
    });

    console.log("user", user);

    return user;
  } catch (error) {
    console.log(error);
  }
}
