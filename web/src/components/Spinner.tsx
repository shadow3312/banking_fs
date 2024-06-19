import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import React from "react";

export default function Spinner({ large = false }: { large?: boolean }) {
  return (
    <LoaderIcon className={cn(large ? "h-8 w-8" : "h-4 w-4", "animate-spin")} />
  );
}
