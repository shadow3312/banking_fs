import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

const createNaveLinks = (className: string) => {
  const navLinks: NavLinks = {
    sidebarConfig: [
      {
        title: "Dashboard",
        href: "/",
        icon: (isActive: boolean) =>
          Icons.home({
            className: cn(className, isActive && "nav-icon-active"),
          }),
      },
      {
        title: "Transfer funds",
        href: "/transfer",
        icon: (isActive: boolean) =>
          Icons.fundsOut({
            className: cn(className, isActive && "nav-icon-active"),
          }),
      },
      {
        title: "Transactions history",
        href: "/history",
        icon: (isActive: boolean) =>
          Icons.history({
            className: cn(className, isActive && "nav-icon-active"),
          }),
      },
    ],
  };
  return navLinks;
};

export { createNaveLinks };
