"use client";

export default function CheckboxInput({ inputParams, errors, label }) {
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
          {inputParams.required && <span>*</span>}
        </label>
      </div>

      <p className="h-8 text-pink-500">{errors && errors?.message}</p>
    </div>
  );
}
