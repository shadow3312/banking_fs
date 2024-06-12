import React from "react";
import { Button } from "./ui/button";
import PlaidLink from "./PlaidLink";
import BankCard from "./BankCard";
import { Input } from "./ui/input";
import UserInfo from "./UserInfo";
import { getServerAuthSession } from "@/server/auth";
import { ScrollArea } from "./ui/scroll-area";

export default async function HomeAside() {
  const session = await getServerAuthSession();
  const user = session?.user.user;
  return (
    <div className="home-aside">
      <div className="flex items-center justify-between">
        <h3 className="title">My Banks</h3>
        <PlaidLink />
      </div>
      <BankCard mask="3409" balance="19678.65" />
      <div className="home-aside-bottom">
        <h3 className="subtitle">Send money to</h3>
        <Input placeholder="John Doe" className="form-input" type={"text"} />
        <ScrollArea className="list-users-wrapper">
          <div className="list-users">
            {user &&
              Array(5)
                .fill(5)
                .map((value: any, index: number) => (
                  <UserInfo key={index} user={user} />
                ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
