"use client";

import useTranslatedError from "@/hooks/useTranslatedError";
import { Control, useController } from "react-hook-form";

type CheckboxInputProps = {
  control: Control<any>;
  name: string;
  label: string;
  required: boolean;
};

export default function CheckboxInput({
  control,
  name,
  label,
  required,
}: CheckboxInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const translateError = useTranslatedError(error);
  return (
    <div className="flex w-full flex-col">
      <div className="flex">
        <div className="pr-2">
          <input
            {...field}
            className="h-5 w-5 accent-violet"
            type="checkbox"
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        <label>
          {label}
          {required && <span className="font-bold text-violet">*</span>}
        </label>
      </div>

      <p className="h-8 text-error">{translateError?.message}</p>
    </div>
  );
}
