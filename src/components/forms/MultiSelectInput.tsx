"use client";

import Select from "react-select";

export default function MultiSelectInput({
  inputParams,
  errors,
  label,
  options,
  formControl,
  controllerComponent,
}) {
  const Controller = controllerComponent;
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={inputParams.name}
        control={formControl}
        render={({ field: { onChange, value, name, ref } }) => (
          <Select
            name={name}
            ref={ref}
            placeholder={label}
            options={options}
            isMulti
            value={options.find((c) => c.value === value)}
            onChange={(values) => onChange(values.map((v) => v.value))}
          />
        )}
      />
      {inputParams.required && <span>*</span>}
      <p className="h-8 text-pink-500">{errors && errors?.message}</p>
    </div>
  );
}
