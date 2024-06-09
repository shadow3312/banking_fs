"use server";

import { api } from "@/trpc/server";
import { createDwollaCustomer } from "./dwolla.actions";
import { signIn } from "next-auth/react";

export async function registerUser(userPayload: IRegisterPayload) {
  try {
    const { email, password, firstName, lastName } = userPayload;

    // First create the dwolla customer to generate the customerUrl
    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userPayload,
      type: "personal",
    });

    if (!dwollaCustomerUrl) throw new Error(`Failed to create dwolla customer`);

    console.log("url", dwollaCustomerUrl);
    // Next extract the id from the customerUrl

    // const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    // const user = await api.auth.register.mutate({
    //   ...userPayload,
    //   dwollaCustomerUrl,
    //   dwollaCustomerId
    // });

    // if (user) {
    //   await signIn("credentials", {email, password, redirect: false})
    // }

    // return user;
  } catch (error) {
    console.log(error);
  }
}
