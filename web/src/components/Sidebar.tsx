"use client";

import { navLinks } from "@/config/links";
import { cn, getInitials, truncateText } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UserAvatar from "./UserAvatar";
import UserInfo from "./UserInfo";
import TransferSheet from "./TransferSheet";
import { Icons } from "./Icons";

export default function Sidebar({ user }: NavProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="mb-16 flex items-center justify-between">
        <h3 className="text-2xl">Banking</h3>
        <ThemeToggle className="h-5 w-5" />
      </div>
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
                {navLink.title}
              </span>
              {isActive && <div className={cn("link active ml-auto")}></div>}
            </Link>
          );
        })}
        <TransferSheet>
          <div className="nav-link">
            <div className={cn("nav-icon-wrapper")}>{Icons.fundsOut({})}</div>
            <span className={cn("nav-title")}>Send money</span>
          </div>
        </TransferSheet>
      </div>
      <div className="sidebar-bottom">
        <UserInfo user={user} truncate />
        <div className="ml-auto">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
