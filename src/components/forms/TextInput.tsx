"use client";
import { useId } from "react";
import { useController, Control } from "react-hook-form";
import useTranslatedError from "@/hooks/useTranslatedError";

type TextInputProps = {
  control: Control<any>;
  name: string;
  label: string;
  required: boolean;
  disabled?: boolean;
};

export default function TextInput({
  control,
  name,
  label,
  required,
  disabled = false,
}: TextInputProps) {
  const id = useId();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    disabled,
  });

  const translatedError = useTranslatedError(error);

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={id}>
        {label}
        {required && <span className="font-bold text-violet">*</span>}
      </label>
      <input
        id={id}
        className={`rounded border border-gray-300 px-2 py-1.5 outline-none hover:border-gray-400 focus:outline-offset-0 focus:outline-lilac ${error ? "border-error" : ""} ${disabled ? "bg-gray-200 hover:border-gray-300" : ""}`}
        type="text"
        aria-invalid={error ? "true" : "false"}
        disabled={disabled}
        {...field}
      />

      <p className="h-8 text-error">{translatedError?.message}</p>
    </div>
  );
}
