"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  async function handleLogout() {
    await signOut();
  }
  return <Button onClick={() => handleLogout()}>Logout</Button>;
}
