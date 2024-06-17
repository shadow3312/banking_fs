"use client";
import { useCookies } from "next-client-cookies";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import PlaidLink from "./PlaidLink";
import { useRecoilState } from "recoil";
import { firstLaunchAtom } from "@/state/atom";

export default function Welcome() {
  const [open, setOpen] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useRecoilState(firstLaunchAtom);
  const { data: session } = useSession();
  const user = session?.user.user;

  useEffect(() => {
    setOpen(isFirstLaunch);
  }, [isFirstLaunch]);
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dialog-title">
            Welcome, {user?.firstName} {user?.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <p className="dialog-description">
            Since it's your first time here, let's begin by connecting a bank
            account to manage your financial transaction
          </p>
        </div>
        <DialogFooter className="sm:justify-start">
          {user && <PlaidLink large user={user} />}
          <DialogClose asChild>
            <Button
              onClick={() => setIsFirstLaunch(false)}
              type="button"
              variant="secondary"
            >
              I will do this later
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
