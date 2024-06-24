"use client";

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnExit,
} from "react-plaid-link";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/server/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { firstLaunchAtom, linkReadyAtom, openPlaidAtom } from "@/state/atom";
import { toast } from "./ui/use-toast";
import { useLoading } from "@/lib/hooks/useLoading";
import { Icons } from "./Icons";
import Spinner from "./Spinner";

interface Props {
  user: IUser;
  large?: boolean;
}

export default function PlaidLink({ user, large = false }: Props) {
  const [token, setToken] = useState<string | null>("");
  const [isFirstLaunch, setIsFirstLaunch] = useRecoilState(firstLaunchAtom);
  const [isLoading, setLoading] = useLoading("BankCard");
  const [openPlaid, setOpenPlaid] = useRecoilState(openPlaidAtom);
  const [isLinkReady, setIsLinkReady] = useRecoilState(linkReadyAtom);

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
      setOpenPlaid(false);
      toast({
        title: "Hold on",
        description: "We're adding your bank account",
      });
      setLoading(true);

      await exchangePublicToken({
        publicToken,
        user,
      });

      startTransition(() => {
        router.refresh();
        setLoading(false);
        toast({
          title: "Success",
          description: "Your bank has been added successfuly",
        });
      });
    },
    [user],
  );

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    setOpenPlaid(false);
    console.log(error, metadata);
  }, []);

  const handleOpen = () => {
    setOpenPlaid(true);
  };

  const config = {
    token,
    onSuccess,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    getLinkToken();
  }, [user]);

  useEffect(() => {
    setIsLinkReady(ready);
  }, [ready]);

  useEffect(() => {
    if (ready && openPlaid) {
      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      }
      open();
    }
  }, [openPlaid, ready]);

  if (!ready) {
    return <Spinner />;
  }
  return large ? (
    <Button onClick={() => handleOpen()}>Connect bank</Button>
  ) : (
    <Button size={"icon"} onClick={() => handleOpen()}>
      {Icons.cardAdd({ className: "text-white" })}
    </Button>
  );
}
