"use client";

import { useState } from "react";
import { Control, useController } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import useTranslatedError from "@/hooks/useTranslatedError";

type PhoneNumberInputProps = {
  name: string;
  control: Control<any>;
  label: string;
  required: boolean;
};

export default function PhoneNumberInput({
  name,
  control,
  label,
  required,
}: PhoneNumberInputProps) {
  const [focused, setFocused] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const translatedError = useTranslatedError(error);

  return (
    <div className="flex w-full flex-col">
      <label>
        {label}
        {required && <span className="font-bold text-violet">*</span>}
      </label>
      <PhoneInput
        {...field}
        international
        defaultCountry="CA"
        className={`w-full rounded border border-gray-300 bg-white px-2 py-1.5 outline-none outline-offset-0  hover:border-gray-400 ${
          focused ? "outline-offset-0 outline-lilac" : "hover:border-gray-400"
        } ${error ? "border-error" : ""}`}
        aria-invalid={error ? "true" : "false"}
        // The outline rules from Tailwind are not being recognized with the regular focus state.
        // These two handlers are a work-around.
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <p className="h-8 text-error">{translatedError?.message}</p>
    </div>
  );
}
