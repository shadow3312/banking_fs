"use client";

import { navLinks } from "@/config/links";
import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { signOut } from "next-auth/react";
import TransferSheet from "./TransferSheet";
import { Icons } from "./Icons";

export default function MobileNav({ user }: NavProps) {
  const pathname = usePathname();

  async function handleLogout() {
    await signOut();
  }
  return (
    <div className="mobile-nav-wrapper">
      <div className="mobile-nav">
        <div className="nav-items">
          {navLinks.sidebarConfig.map((navLink: NavItem) => {
            const isActive = pathname === navLink.href;
            return (
              <Link
                key={navLink.href}
                href={navLink.href}
                className={cn("nav-link")}
              >
                <div className={cn(isActive && "active", "nav-icon-wrapper")}>
                  {navLink.icon(isActive)}
                </div>
                <span className={cn(isActive && "active", "nav-title")}>
                  {navLink.mobileTitle}
                </span>
              </Link>
            );
          })}
          <div className="nav-link">
            <TransferSheet>
              <div>
                <div className={cn("nav-icon-wrapper")}>
                  {Icons.fundsOut({})}
                </div>
                <span className={cn("nav-title")}>Send</span>
              </div>
            </TransferSheet>
          </div>
          <Popover>
            <PopoverTrigger>
              <UserAvatar
                fallback={getInitials([user.firstName, user.lastName])}
              />
            </PopoverTrigger>
            <PopoverContent className="mr-4 w-64">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <ThemeToggle />
                </div>
                <p className="text-sm">{user.email}</p>
              </div>

              <Button onClick={() => handleLogout()} className="rounded-button">
                Logout <LogOut className="ml-4 h-5 w-5" />
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
