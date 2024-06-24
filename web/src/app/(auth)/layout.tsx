import { Icons } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-left">
            <div className="absolute right-4 top-4">
              <ThemeToggle />
            </div>
            {children}
          </div>
          <div className="auth-right"></div>
        </div>
        <div className="auth-bottom">
          <div className="flex gap-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadow3312.png" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between">
              <p>Shuruzer</p>
              <p className="flex gap-1 text-sm text-gray-700 dark:text-gray-400">
                Made with <Heart className="h-4 w-4 text-red-600" />
              </p>
            </div>
          </div>
          <Link
            href={"https://github.com/shadow3312/banking_fs/"}
            className="flex items-center gap-2"
          >
            {Icons.gitHub({ className: "w-8 h-8" })}
            <p>Check the sauce</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
