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

export async function createOnDemandAuthorization() {
  try {
    const authorization = await dwolla.post("on-demand-authorizations");
    const authLink = authorization.body._links;

    return authLink;
  } catch (error) {
    console.log(`Failed to create on demand authorization ${error}`);
  }
}

export async function createFundingSource(options: IFundingSourceOptions) {
  try {
    return await dwolla
      .post(`/customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (error) {
    console.log(`Failed to create funding source ${error}`);
  }
}

export async function addFundingSource({
  dwollaCustomerId,
  processorToken,
  bankName,
}: IAddFundingSource) {
  try {
    const authLinks = await createOnDemandAuthorization();

    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: authLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Failed to add funding source: ", err);
  }
}

export async function initiateTransfer({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: IInitiateTransferOptions) {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    const response = await dwolla.post(`transfers`, requestBody);

    return response.headers.get("location");
  } catch (error) {
    throw new Error(`Failed to create dwolla transfer ${error}`);
  }
}
