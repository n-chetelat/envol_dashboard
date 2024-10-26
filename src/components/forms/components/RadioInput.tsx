"use client";

import { Control, useController } from "react-hook-form";
import useTranslatedError from "@/hooks/useTranslatedError";

interface Option {
  value: string;
  label: string;
}

interface RadioInputProps {
  options: Option[];
  control: Control<any>;
  name: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
  required: boolean;
}

const sizeClasses: Record<RadioInputProps["size"] & string, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export default function RadioInput({
  options,
  control,
  name,
  size = "md",
  label,
  disabled = false,
  required,
}: RadioInputProps) {
  const radioSizeClass = sizeClasses[size] || sizeClasses.md;
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  const translatedError = useTranslatedError(error);

  return (
    <div className="flex w-full flex-col">
      <fieldset aria-disabled={disabled}>
        <legend className="mb-2 label">
          {label}
          {label && required && <span className="text-error">*</span>}
        </legend>
        {options.map((option) => (
          <div key={option.value} className="mb-2 flex items-center">
            <input
              {...field}
              id={`radio-${option.value}`}
              type="radio"
              value={option.value}
              className={`mr-2 ${radioSizeClass} cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-all duration-200 checked:border-0 checked:border-violet checked:bg-violet focus:shadow-radio-ring-focus focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50`}
              disabled={disabled}
            />
            <label
              htmlFor={`radio-${option.value}`}
              className={
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }
            >
              {option.label}
            </label>
          </div>
        ))}
      </fieldset>
      <p className="mt-1 h-8 text-error">{translatedError?.message}</p>
    </div>
  );
}
