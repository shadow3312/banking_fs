import { displayCardNumber, formatAmount } from "@/lib/utils";
import React from "react";
import { Icons } from "./Icons";

export default function BankCard({ mask, balance }: BankCardProps) {
  return (
    <div className="bank-card">
      <div className="balance">
        <h4 className="text-gray-200">Balance</h4>
        <h3 className="balance-title">{formatAmount(balance)}</h3>
      </div>
      <div className="flex items-center">
        <CardNumber num={12} mask={mask} />
      </div>
      <div className="bank-card-bottom">
        <div>
          <h4>Joe Macklemore</h4>
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
