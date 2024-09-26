import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Error messages in validation schema can have this format for i18n:
// errorKey@arg1::one--arg2::two
export const translateError = (
  t: Function,
  keyErrors: FieldError | undefined,
): Partial<FieldError> | undefined => {
  if (keyErrors?.message) {
    const argObj: { [key: string]: string } = {};
    const [errorKey, argList] = keyErrors.message.split("@");
    if (argList) {
      const args = argList.split("--").map((arg) => arg.split("::"));
      if (args.length) {
        args.forEach((arg) => (argObj[arg[0]] = arg[1]));
      }
    }
    return {
      message: t(`errors.${errorKey}`, argObj),
    };
  }
  return undefined;
};
