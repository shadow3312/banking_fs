"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  async function handleLogout() {
    await signOut();
  }
  return (
    <Button
      className="border bg-transparent text-black"
      size={"icon"}
      onClick={() => handleLogout()}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
}
