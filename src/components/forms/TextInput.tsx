"use client";

export default function TextInput({ inputParams, errors, label }) {
  return (
    <div className="flex w-full flex-col">
      <label>
        {label}
        {inputParams.required && <span>*</span>}
      </label>
      <input
        className={`rounded border border-gray-300 px-2 py-1.5 outline-none hover:border-gray-400 focus:outline-offset-0 focus:outline-lilac ${errors ? "border-vermillion" : ""}`}
        type="text"
        aria-invalid={errors ? "true" : "false"}
        {...inputParams}
      />

      <p className="h-8 text-vermillion">{errors?.message}</p>
    </div>
  );
}
