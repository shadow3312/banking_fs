"use client";

import React from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import UserInfo from "./UserInfo";
import { useRecoilValue } from "recoil";
import { selectedBankAtom } from "@/state/atom";

export default function UserList({ user }: { user: IUser | undefined }) {
  const selectedBank = useRecoilValue(selectedBankAtom);
  return (
    <div className="home-aside-bottom">
      <div className="mb-4">
        <h3 className="subtitle">
          From{" "}
          <span className="font-semibold text-green-500">
            {selectedBank?.account_name}
          </span>
          {" - "}
          <span>{selectedBank?.mask}</span>
        </h3>
        <h3 className="subtitle">Send money to</h3>
      </div>
      <Input placeholder="John Doe" className="form-input" type={"text"} />
      <ScrollArea className="list-users-wrapper space-y-4">
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
  );
}
