"use client";

export default function PhoneNumberInput({ inputParams, errors, label }) {
  return (
    <div>
      <input
        className={`border-2 ${errors ? "border-pink-500" : ""}`}
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        aria-invalid={errors ? "true" : "false"}
        placeholder={label}
        {...inputParams}
      />
      {inputParams.required && <span>*</span>}
      <p className="h-8 text-pink-500">{errors && errors?.message}</p>
    </div>
  );
}
