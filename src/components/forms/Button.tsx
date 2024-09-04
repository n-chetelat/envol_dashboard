import React from "react";
import { Loader } from "@/libs/icons";
import { useTranslations } from "next-intl";

interface ButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
  children: React.ReactNode;
}

export default function Button({ isValid, isSubmitting, children }) {
  const t = useTranslations("common");
  return (
    <button
      className={`btn-primary`}
      disabled={!isValid || isSubmitting}
      type="submit"
      aria-busy={isSubmitting}
      aria-disabled={!isValid || isSubmitting}
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
