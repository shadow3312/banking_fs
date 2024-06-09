"use client";

import { LoaderIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function ThemeToggle({ className }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Spinner />;
  }
  return (
    <div className="cursor-pointer" onClick={toggleTheme}>
      {isDark ? (
        <Sun className={cn("h-4 w-4", className)} />
      ) : (
        <Moon className={cn("h-4 w-4", className)} />
      )}
    </div>
  );
}
