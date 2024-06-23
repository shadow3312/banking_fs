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

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check email format
  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}

export const validateEmail = Object.freeze({
  isValidEmail: (email: string) => isValidEmail(email),
});

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export function getTransactionsStats(
  transactions: TTransaction[],
): IMonthlyData {
  let totalIncome = 0;
  let totalExpense = 0;
  const monthlyData: { [key: string]: { income: number; expense: number } } =
    {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!monthlyData[key]) {
      monthlyData[key] = { income: 0, expense: 0 };
    }

    if (transaction.amount > 0) {
      monthlyData[key]!.income += Number(transaction.amount);
      totalIncome += Number(transaction.amount);
    } else {
      monthlyData[key]!.expense += Math.abs(Number(transaction.amount));
      totalExpense += Math.abs(Number(transaction.amount));
    }
  });

  const labels = Object.keys(monthlyData).sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");

    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);

    return dateA.getTime() - dateB.getTime();
  });

  const monthlyIncome = labels.map((label) => monthlyData[label]!.income);
  const monthlyExpense = labels.map((label) => monthlyData[label]!.expense);

  return {
    labels,
    monthlyIncome,
    monthlyExpense,
    totalIncome,
    totalExpense,
  };
}
