"use client";

import { InputProps } from "@/libs/types";
export default function CheckboxInput({
  inputParams,
  errors,
  label,
  required,
}: InputProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex">
        <div className="pr-2">
          <input
            className="h-5 w-5 accent-violet"
            type="checkbox"
            aria-invalid={errors ? "true" : "false"}
            {...inputParams}
          />
        </div>

        <label>
          {label}
          {required && <span className="font-bold text-violet">*</span>}
        </label>
      </div>

      <p className="h-8 text-error">{errors?.message}</p>
    </div>
  );
}
