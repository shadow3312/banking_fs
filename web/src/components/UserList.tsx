"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import UserInfo from "./UserInfo";
import { useRecoilValue } from "recoil";
import { selectedBankAtom } from "@/state/atom";
import { truncateText, validateEmail } from "@/lib/utils";
import { toast } from "./ui/use-toast";
import { api } from "@/trpc/server";
import { getUserBanks, getUserByEmail } from "@/server/actions/user.actions";

export default function UserList() {
  const selectedBank = useRecoilValue(selectedBankAtom);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<IUser | undefined>();
  const [banks, setBanks] = useState<IBank[] | undefined>();

  const handleClickUser = async () => {
    if (user) {
      const result = await getUserBanks({ userId: user.id });
      setBanks(result);
    }
  };

  const hanleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setBanks([]);
    if (validateEmail.isValidEmail(email)) {
      const user = await getUserByEmail(email);

      if (!user) {
        setErrorMessage("User not found");
      }

      setUser(user);
    } else {
      // toast({
      //   title: "Validation error",
      //   description: "Enter a valid email",
      // });
      setErrorMessage("Enter a valid email");
    }
  };
  return (
    <div className="home-aside-bottom">
      <div className="mb-4">
        <h3 className="subtitle">
          From{" "}
          <span className="font-semibold text-green-500">
            {user?.firstName} {user?.lastName}
          </span>
          {" - "}
          <span>{selectedBank?.mask}</span>
        </h3>
        <h3 className="subtitle">Send money to</h3>
      </div>
      <Input
        placeholder="Enter email"
        className="form-input"
        type={"text"}
        value={email}
        onChange={hanleChangeEmail}
        onKeyDown={handleKeyDown}
        onSubmit={() => handleSubmit()}
      />
      <ScrollArea className="list-users-wrapper space-y-4">
        <div className="list-users">
          {user && <UserInfo user={user} onClick={handleClickUser} />}

          {banks &&
            banks.map((bank: IBank, index: number) => (
              <div className="flex cursor-pointer" key={bank.id}>
                <p>
                  Bank {index + 1}: {truncateText(bank.publicId, 24)}
                </p>
              </div>
            ))}
        </div>
        {errorMessage && (
          <p className="text-center font-semibold text-red-500">
            {errorMessage}
          </p>
        )}
      </ScrollArea>
    </div>
  );
}
