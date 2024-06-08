import AuthForm from "@/components/forms/AuthForm";
import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";

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
          <div className="col-span-1 rounded-r-2xl bg-secondary dark:bg-primary"></div>
        </div>
        <div className="auth-bottom">
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
      </div>
    </main>
  );
}
