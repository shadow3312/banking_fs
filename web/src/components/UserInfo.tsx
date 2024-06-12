import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UserAvatar from "./UserAvatar";
import { getInitials, truncateText } from "@/lib/utils";

export default function UserInfo({ user, truncate = false }: UserInfoProps) {
  return (
    <div className="user-info">
      <UserAvatar fallback={getInitials([user.firstName, user.lastName])} />
      <div className="flex flex-col justify-between">
        <p>
          {user.firstName} {user.lastName}
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-sm">
                {truncate ? truncateText(user.email, 20) : user.email}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
