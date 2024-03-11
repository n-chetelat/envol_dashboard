"use client";

import Select, { StylesConfig } from "react-select";

const multiSelectInputStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "white",
    borderColor: "#ccc",
    boxShadow: "0 0 #0000",
    outline: state.isFocused ? "2px solid #87C6E4" : "none",
    ":hover": {
      ...baseStyles[":hover"],
      borderColor: "#9ca3af",
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#87C6E4" : undefined,
  }),
};

export default function MultiSelectInput({
  inputParams,
  errors,
  label,
  options,
  placeholder,
  formControl,
  controllerComponent,
}) {
  const Controller = controllerComponent;
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
          <Select
            name={name}
            ref={ref}
            placeholder={`${placeholder}...`}
            options={options}
            isMulti
            value={options.find((c) => c.value === value)}
            onChange={(values) => onChange(values.map((v) => v.value))}
            styles={multiSelectInputStyles}
          />
        )}
      />
      <p className="h-8 text-pink-500">{errors && errors?.message}</p>
    </div>
  );
}
