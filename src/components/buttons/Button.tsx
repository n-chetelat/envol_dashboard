import type { ButtonHTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { Loader } from "@/libs/icons";
import { cn } from "@/libs/utils";

interface ButtonProps {
  isValid?: boolean;
  isSubmitting: boolean;
  buttonType?: "info" | "alert";
  className?: string;
  children: React.ReactNode;
  isSubmitType?: boolean;
}

export default function Button({
  isValid = true,
  isSubmitting,
  children,
  buttonType = "info",
  className,
  isSubmitType = true,
  ...nativeButtonProps
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const t = useTranslations("common");
  const buttonClasses = cn(
    "btn-primary",
    buttonType === "alert" ? "bg-error hover:bg-error-dark" : "",
    className,
  );
  return (
    <button
      className={buttonClasses}
      disabled={!isValid || isSubmitting}
      type={isSubmitType ? "submit" : "button"}
      aria-busy={isSubmitting}
      aria-disabled={!isValid || isSubmitting}
      {...nativeButtonProps}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center">
          <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          {`${t("submitting")}...`}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
