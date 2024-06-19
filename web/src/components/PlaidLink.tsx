"use client";

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from "react-plaid-link";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/server/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { firstLaunchAtom, loadingActivityAtom } from "@/state/atom";
import { toast } from "./ui/use-toast";

interface Props {
  user: IUser;
  large?: boolean;
}

export default function PlaidLink({ user, large = false }: Props) {
  const [token, setToken] = useState<string | null>("");
  const [isFirstLaunch, setIsFirstLaunch] = useRecoilState(firstLaunchAtom);
  const [loadingActivity, setLoadingActivity] =
    useRecoilState(loadingActivityAtom);

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
      toast({
        title: "Hold on",
        description: "We're adding your bank account",
      });
      setLoadingActivity({
        component: "BankCard",
        isLoading: true,
      });

      await exchangePublicToken({
        publicToken,
        user,
      });

      startTransition(() => {
        router.refresh();
        setLoadingActivity({
          component: "BankCard",
          isLoading: false,
        });
        toast({
          title: "Success",
          description: "Your bank has been added successfuly",
        });
      });
    },
    [user],
  );

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    console.log(error, metadata);
  }, []);

  const handleOpen = () => {
    setIsFirstLaunch(false);
    open();
  };

  useEffect(() => {
    getLinkToken();
  }, [user]);

  const config = {
    token,
    onSuccess,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);

  return large ? (
    <Button onClick={() => handleOpen()}>Connect bank</Button>
  ) : (
    <Button size={"icon"} onClick={() => handleOpen()}>
      <PlusCircle />
    </Button>
  );
}
