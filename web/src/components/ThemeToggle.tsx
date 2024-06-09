"use client";

import { LoaderIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

type Props = {
  setTheme: (theme: string) => void;
};

export default function ThemeToggle() {
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
        <Sun className="h-4 w-4" role="img" />
      ) : (
        <Moon className="h-4 w-4" role="img" />
      )}
    </div>
  );
}
