"use client";

export default function TextInput({ inputParams, errors, label }) {
  return (
    <div className="flex w-full flex-col">
      <label>
        {label}
        {inputParams.required && <span>*</span>}
      </label>
      <input
        className={`focus:outline-babyblue rounded border border-gray-300 px-2 py-1.5  outline-none outline-offset-0 hover:border-gray-400 focus:outline-offset-0 ${errors ? "border-orange" : ""}`}
        type="text"
        aria-invalid={errors ? "true" : "false"}
        {...inputParams}
      />

      <p className="h-8 text-pink-500">{errors && errors?.message}</p>
    </div>
  );
}
