import React from "react";
import { Button } from "./ui/button";
import PlaidLink from "./PlaidLink";
import BankCard from "./BankCard";
import { Input } from "./ui/input";
import UserInfo from "./UserInfo";
import { getServerAuthSession } from "@/server/auth";
import { ScrollArea } from "./ui/scroll-area";
import BankCardStack from "./BankCardStack";
import UserList from "./UserList";

export default async function HomeAside({ banks }: HomeAsideProps) {
  const session = await getServerAuthSession();
  const user = session?.user.user;
  return (
    <div className="home-aside">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="title">My Banks</h3>
        {user && <PlaidLink user={user} />}
      </div>
      <div className="mx-auto -ml-2 md:m-0">
        {banks && user && <BankCardStack banks={banks} user={user} />}
      </div>

      <UserList />
    </div>
  );
}
