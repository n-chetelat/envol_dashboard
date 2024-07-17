"use client";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Controller } from "react-hook-form";

export default function PhoneNumberInput({
  inputParams,
  errors,
  label,
  formControl,
}) {
  // The outline rules from Tailwind are not being recognized in this element.
  // These two handlers are a work-around.
  const onFocus = (event: React.FocusEvent<HTMLElement, Element>) => {
    if (event.target.parentElement) {
      event.target.parentElement.style.outline = "2px solid #9F90C0";
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    if (event.target.parentElement) {
      event.target.parentElement.style.outline = "2px solid transparent";
    }
  };

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
            className={`w-full rounded border border-gray-300 bg-white px-2 py-1.5 outline-none outline-offset-0  hover:border-gray-400 ${errors ? "border-vermillion" : ""}`}
            aria-invalid={errors ? "true" : "false"}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
      />
      <p className="h-8 text-vermillion">{errors && errors?.message}</p>
    </div>
  );
}
