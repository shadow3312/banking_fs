"use server";

import { api } from "@/trpc/server";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { signIn } from "next-auth/react";
import { encryptId, extractCustomerId } from "@/lib/utils";
import plaidClient from "../plaid";
import {
  CountryCode,
  LinkTokenCreateRequest,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createLinkToken(user: IUser) {
  try {
    const params: LinkTokenCreateRequest = {
      user: {
        client_user_id: user.id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(params);

    const obj = { linkToken: response.data.link_token };

    return obj;
  } catch (error) {
    console.log(`An error occurred while creating token ${error}`);
  }
}

export async function exchangePublicToken({
  publicToken,
  user,
}: IExchangePublicToken) {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const { access_token: accessToken, item_id: itemId } = response.data;

    // Get Plaid's account ID
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    if (accountData) {
      const accountId = accountData.account_id;
      const encodedId = encryptId(accountId);

      // Create a processor token for dwolla with the account id

      const request: ProcessorTokenCreateRequest = {
        access_token: accessToken,
        account_id: accountId!,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      };

      // plaidClient
      //   .processorTokenCreate(request)
      //   .then((res) => console.log("succ", res))
      //   .catch((err) => console.log("err", err));

      const processorTokenResponse =
        await plaidClient.processorTokenCreate(request);

      const processorToken = processorTokenResponse.data.processor_token;

      // Create a funding source for the given account and bank

      const fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken,
        bankName: accountData?.name,
      });

      if (!fundingSourceUrl)
        throw new Error(`Failed to create a funding source`);

      // Next, create a bank account
      const bank = await api.banks.create.mutate({
        accessToken,
        fundingSourceUrl,
        accountId: accountId,
        publicId: encodedId,
        userId: user.id,
      });

      revalidatePath("/");

      return {
        publicTokenExchange: "done",
      };
    }
  } catch (error) {
    console.log(`Error while exchanging public token ${error}`);
  }
}
