import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const translateError = (
  t: Function,
  keyErrors: FieldError | undefined,
): Partial<FieldError> | undefined => {
  return keyErrors?.message
    ? {
        message: t(`errors.${keyErrors.message}`),
      }
    : undefined;
};
