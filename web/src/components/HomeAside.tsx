import React from "react";
import { Button } from "./ui/button";
import PlaidLink from "./PlaidLink";
import BankCard from "./BankCard";

export default function HomeAside() {
  return (
    <div className="home-aside">
      <div className="flex items-center justify-between">
        <h3 className="title">My Banks</h3>
        <PlaidLink />
      </div>
      <BankCard mask="3409" balance="19678.65" />
      <div className="send">
        <h3 className="title">Send money to</h3>
      </div>
    </div>
  );
}
