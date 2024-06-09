"use client";

import { navLinks } from "@/config/links";
import { cn, truncateText } from "@/lib/utils";
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
      </div>
      <div className="sidebar-bottom">
        <UserAvatar />
        <div className="flex flex-col justify-between">
          <p>
            {user.firstName} {user.lastName}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-sm">{truncateText(user.email, 20)}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="ml-auto">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
