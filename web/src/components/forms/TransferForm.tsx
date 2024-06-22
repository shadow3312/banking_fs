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
import { decryptId, formatAmount } from "@/lib/utils";
import { Icons } from "../Icons";
import LargeButton from "../LargeButton";
import {
  getBankAccount,
  getBankByAccount,
} from "@/server/actions/bank.actions";
import { getBank } from "@/server/actions/user.actions";
import { initiateTransfer } from "@/server/actions/dwolla.actions";
import { createTransaction } from "@/server/actions/transaction.actions";
import { router } from "~/presentation/trpc/trpc";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

type TransferFormProps = {
  destinationFundingSource?: string;
  email?: string;
};
export default function TransferForm({
  destinationFundingSource,
  email,
}: TransferFormProps) {
  const selectedBank = useRecoilValue(selectedBankAtom);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    try {
      if (selectedBank) {
        setIsLoading(true);
        const destinationAccountId = decryptId(data.destinationFundingSource);
        const senderBank = await getBank({ id: selectedBank?.bankId });
        const receiverBank = await getBankByAccount({
          accountId: destinationAccountId,
        });

        if (senderBank && receiverBank) {
          const transferPayload = {
            sourceFundingSourceUrl: senderBank.fundingSourceUrl,
            destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
            amount: data.amount,
          };
          const transfer = await initiateTransfer(transferPayload);

          if (transfer) {
            // Save the transaction in db
            const transactionPayload: ITransactionCreate = {
              name: data.note,
              email: data.email,
              amount: data.amount.toString(),
              senderId: senderBank.userId,
              senderBankId: senderBank.id,
              receiverId: receiverBank.userId,
              receiverBankId: receiverBank.id,
            };
            const transaction = await createTransaction(transactionPayload);

            if (transaction) {
              setIsLoading(false);
              form.reset();
              router.refresh();
              toast({
                title: "Sucess",
                description: "Your transfer request has been sent successfuly",
              });
            }
          }
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: `${"message" in error ? error.message : error}`,
      });
    }
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
          <LargeButton isLoading={isLoading} text="Send" />
        </form>
      </Form>
    </div>
  );
}
