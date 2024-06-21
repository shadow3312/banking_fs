"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { transferFormSchema } from "@/lib/schemas";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import { useRecoilValue } from "recoil";
import { selectedBankAtom } from "@/state/atom";
import { formatAmount } from "@/lib/utils";
import { Icons } from "../Icons";
import LargeButton from "../LargeButton";

type TransferFormProps = {
  destinationFundingSource?: string;
  email?: string;
};
export default function TransferForm({
  destinationFundingSource,
  email,
}: TransferFormProps) {
  const selectedBank = useRecoilValue(selectedBankAtom);

  const form = useForm<z.infer<typeof transferFormSchema>>({
    resolver: zodResolver(transferFormSchema),
  });

  useEffect(() => {
    form.reset({
      email,
      destinationFundingSource,
    });
  }, [email, destinationFundingSource]);

  const onSubmit = async (data: z.infer<typeof transferFormSchema>) => {
    console.log("dt", data);
  };
  return (
    <div className="transfer-form-wrapper">
      <div className="transfer-form-header">
        <div>
          <h3 className="subtitle">
            From <span className="font-semibold">{selectedBank?.name}</span>
            {" - "}
            <span>{selectedBank?.mask}</span>
          </h3>
          {selectedBank?.currentBalance && (
            <h3>
              Current balance:{" "}
              <span className="font-semibold">
                {formatAmount(selectedBank?.currentBalance)}
              </span>
            </h3>
          )}
        </div>
        <div>{Icons.bankLogo({ className: "w-16 h-16 text-white" })}</div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormInput
            control={form.control}
            name="destinationFundingSource"
            label="Receiver's Plaid public id"
            placeholder="Receiver Plaid public id"
            defaultValue={destinationFundingSource}
          />
          <FormInput
            control={form.control}
            name="email"
            label="Receiver's email"
            placeholder="email@gmail.com"
            defaultValue={email}
          />
          <FormInput
            control={form.control}
            name="note"
            label="Transfer note"
            placeholder="Payback"
          />
          <FormInput
            control={form.control}
            name="amount"
            label="Amount"
            placeholder="50"
          />
          <LargeButton text="Send" />
        </form>
      </Form>
    </div>
  );
}
