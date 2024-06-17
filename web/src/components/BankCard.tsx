import { cn, displayCardNumber, formatAmount } from "@/lib/utils";
import React from "react";
import { Icons } from "./Icons";
import { Badge } from "./ui/badge";

export default function BankCard({
  mask,
  balance,
  type,
  account_name,
}: BankCardProps) {
  return (
    <div
      className={cn(
        "bank-card",
        mask === "1111" ? "bg-debit-card" : "bg-credit-card",
      )}
    >
      <div className="balance">
        <h4 className="text-gray-200">Balance</h4>
        <h3 className="balance-title">{formatAmount(balance)}</h3>
      </div>
      <div className="flex items-center">
        <CardNumber num={12} mask={mask} />
      </div>
      <div className="bank-card-bottom">
        <div className="flex gap-2">
          <h4>{account_name}</h4>
          <h4></h4>
          <Badge variant="secondary">{type}</Badge>
        </div>
        {Icons.bankLogo({ className: "w-16 h-16 text-white" })}
      </div>
    </div>
  );
}

function CardNumber({ num, mask }: { num: number; mask: string }) {
  return (
    <div className="card-number-container">
      <span className="card-number">{displayCardNumber(num, mask)}</span>
    </div>
  );
}
