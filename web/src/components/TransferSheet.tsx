"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TransferForm from "./forms/TransferForm";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  children: React.ReactNode;
  destinationFundingSource?: string;
  email?: string;
};
export default function TransferSheet({
  children,
  destinationFundingSource,
  email,
}: Props) {
  return (
    <Sheet>
      <ScrollArea>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className="transfer-sheet-content">
          <SheetHeader>
            <SheetTitle>Send money</SheetTitle>
            <SheetDescription className="dark:text-gray-400">
              Sending money is quite simple
            </SheetDescription>
          </SheetHeader>
          <TransferForm
            destinationFundingSource={destinationFundingSource}
            email={email}
          />
        </SheetContent>
      </ScrollArea>
    </Sheet>
  );
}
