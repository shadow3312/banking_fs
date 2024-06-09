import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

const className = "dark:text-white md:text-black text-white";

const navLinks: NavLinks = {
  sidebarConfig: [
    {
      title: "Dashboard",
      mobileTitle: "Home",
      href: "/",
      icon: (isActive: boolean) =>
        Icons.home({
          className: cn(className, isActive && "nav-icon-active"),
        }),
    },
    {
      title: "Transfer funds",
      mobileTitle: "Transfer",
      href: "/transfer",
      icon: (isActive: boolean) =>
        Icons.fundsOut({
          className: cn(className, isActive && "nav-icon-active"),
        }),
    },
    {
      title: "Transactions history",
      mobileTitle: "History",
      href: "/history",
      icon: (isActive: boolean) =>
        Icons.history({
          className: cn(className, isActive && "nav-icon-active"),
        }),
    },
  ],
};
export { navLinks };
