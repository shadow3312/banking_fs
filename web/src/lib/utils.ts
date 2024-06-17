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

export const truncateText = (text: string, maxChars: number) => {
  if (text) {
    let txt = text?.slice(0, maxChars);

    if (text.length > maxChars) {
      txt += "...";
    }

    return txt;
  }
  return "";
};

function generateMask(num: number): string {
  let mask = "";
  Array(num)
    .fill(num)
    .map((val: number, index: number) => {
      mask += "*";
      if (index !== 0 && (index + 1) % 4 === 0) {
        mask += " ";
      }
    });
  return mask;
}

export function displayCardNumber(num: number = 9, mask: string) {
  const hidden = generateMask(num);
  const cardNumber = hidden + " " + mask;
  return cardNumber;
}

export const getInitials = (strings: string[]): string => {
  const res = strings
    .map((str) => (str && str.length > 0 ? str.slice(0, 1) : "").toUpperCase())
    .join("");
  return res;
};

export function formatAmount(amount: number, currency?: string): string {
  currency = "USD";
  const formated = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(parseFloat(amount.toString()));

  return formated;
}

export const move = <T>(array: T[], from: number, to: number): T[] => {
  const newArray = [...array];
  const [movedItem] = newArray.splice(from, 1);
  movedItem && newArray.splice(to, 0, movedItem);
  return newArray;
};

export const encryptId = (id: string) => {
  return btoa(id);
};

export const decryptId = (id: string) => {
  return atob(id);
};
