import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isObjectClean(obj: Record<string, any>): boolean {
  return Object.entries(obj).every(
    ([key, value]) => value !== undefined && value !== null && value !== "",
  );
}

export function extractCustomerId(url: string): string | undefined {
  const parts = url.split("/");
  const id = parts[parts.length - 1];
  return id;
}
