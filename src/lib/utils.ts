import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type IDate = 'month' | 'year' | 'day'

export function getCurrentDate<T>(flag: IDate) {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  if (!flag) return;
  if (flag === "day") return new Date() as unknown as T;
  if (flag === "year") return new Date().getFullYear() as unknown as T;
  if (flag === "month") return new Date(year, month) as unknown as T;
}
