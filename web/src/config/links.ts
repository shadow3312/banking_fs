import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

export const navIconClassName = "dark:text-white md:text-black text-white";

const navLinks: NavLinks = {
  sidebarConfig: [
    {
      title: "Dashboard",
      mobileTitle: "Home",
      href: "/",
      icon: (isActive: boolean) =>
        Icons.home({
          className: cn(navIconClassName, isActive && "nav-icon-active"),
        }),
    },
    {
      title: "History",
      mobileTitle: "History",
      href: "/history",
      icon: (isActive: boolean) =>
        Icons.history({
          className: cn(navIconClassName, isActive && "nav-icon-active"),
        }),
    },
  ],
};
export { navLinks };
