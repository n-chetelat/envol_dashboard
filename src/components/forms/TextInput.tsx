"use client";
import { InputProps } from "@/types";

export default function TextInput({
  inputParams,
  errors,
  label,
  required,
}: InputProps) {
  return (
    <div className="flex w-full flex-col">
      <label>
        {label}
        {required && <span className="font-bold text-violet">*</span>}
      </label>
      <input
        className={`rounded border border-gray-300 px-2 py-1.5 outline-none hover:border-gray-400 focus:outline-offset-0 focus:outline-lilac ${errors ? "border-error" : ""}`}
        type="text"
        aria-invalid={errors ? "true" : "false"}
        {...inputParams}
      />

      <p className="h-8 text-error">{errors?.message}</p>
    </div>
  );
}
