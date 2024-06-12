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
      title: "Send money",
      mobileTitle: "Send",
      href: "/send",
      icon: (isActive: boolean) =>
        Icons.fundsOut({
          className: cn(className, isActive && "nav-icon-active"),
        }),
    },
    {
      title: "History",
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
