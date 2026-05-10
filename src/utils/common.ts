import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs));
};
