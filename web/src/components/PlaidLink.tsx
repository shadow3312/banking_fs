"use client";

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from "react-plaid-link";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/server/actions/auth.actions";
import { useRouter } from "next/navigation";

export default function PlaidLink({ user }: { user: IUser }) {
  const [token, setToken] = useState<string | null>("");

  const router = useRouter();

  const getLinkToken = async () => {
    const data = await createLinkToken(user);

    if (data?.linkToken) {
      setToken(data?.linkToken);
    }
  };

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    // After getting a publicToken, exchange it for an access token
    async (publicToken: string) => {
      await exchangePublicToken({
        publicToken,
        user,
      });

      router.push("/");
    },
    [user],
  );

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    console.log(error, metadata);
  }, []);

  useEffect(() => {
    getLinkToken();
  }, [user]);

  const config = {
    token,
    onSuccess,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button size={"icon"} onClick={() => open()}>
      <PlusCircle />
    </Button>
  );
}
