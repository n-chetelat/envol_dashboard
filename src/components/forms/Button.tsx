import { Loader } from "@/libs/icons";
import { useTranslations } from "next-intl";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/libs/utils";

interface ButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
  buttonType?: "info" | "alert";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  isValid,
  isSubmitting,
  children,
  buttonType = "info",
  className,
  ...nativeButtonProps
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  console.log(nativeButtonProps);
  const t = useTranslations("common");
  const buttonClasses = cn(
    "btn-primary",
    buttonType === "alert" ? "bg-error hover:bg-error-dark" : "",
    className,
  );
  console.log("other", buttonClasses);
  return (
    <button
      className={buttonClasses}
      disabled={!isValid || isSubmitting}
      type="submit"
      aria-busy={isSubmitting}
      aria-disabled={!isValid || isSubmitting}
      {...nativeButtonProps}
    >
      {isSubmitting ? (
        <span className="flex items-center">
          <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          {`${t("submitting")}...`}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
