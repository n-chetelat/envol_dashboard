"use client";

import { useTranslations } from "next-intl";
import { translateError } from "@/libs/utils";
import { FieldError } from "react-hook-form";

export default function useTranslatedError(
  error: FieldError | undefined,
  // Translation function is optional param to avoid calling useTranslations twice in components that already include it.
  t?: Function | undefined,
): Partial<FieldError> | undefined {
  let translationFunction = t;
  if (!t) {
    translationFunction = useTranslations();
  }
  const translatedError = translateError(
    translationFunction as Function,
    error as FieldError | undefined,
  );

  return translatedError;
}
