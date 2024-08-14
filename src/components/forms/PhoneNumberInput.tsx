"use client";

import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Controller } from "react-hook-form";

export default function PhoneNumberInput({
  inputParams,
  errors,
  label,
  formControl,
}) {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div className="flex w-full flex-col">
      <label>
        {label}
        {inputParams.required && <span>*</span>}
      </label>
      <Controller
        name={inputParams.name}
        control={formControl}
        render={({ field: { onChange, value, name, ref } }) => (
          <PhoneInput
            name={name}
            ref={ref}
            value={value}
            onChange={onChange}
            international
            defaultCountry="CA"
            className={`w-full rounded border border-gray-300 bg-white px-2 py-1.5 outline-none outline-offset-0  hover:border-gray-400 ${focused ? "outline-offset-0 outline-lilac" : "hover:border-gray-400"} ${errors ? "border-error" : ""}`}
            aria-invalid={errors ? "true" : "false"}
            // The outline rules from Tailwind are not being recognized with the regular focus state.
            // These two handlers are a work-around.
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        )}
      />
      <p className="text-error h-8">{errors?.message}</p>
    </div>
  );
}
