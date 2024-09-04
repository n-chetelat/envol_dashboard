import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const translateError = (t: Function, keyErrors: { message: string }) => {
  return (
    keyErrors?.message && {
      message: t(`errors.${keyErrors.message}`),
    }
  );
};
