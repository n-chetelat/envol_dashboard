"use client";

import Select, { StylesConfig } from "react-select";
import { Controller } from "react-hook-form";

const multiSelectInputStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "white",
    borderColor: "#ccc",
    boxShadow: "0 0 #0000",
    outline: state.isFocused ? "2px solid #9F90C0" : "none",
    ":hover": {
      ...baseStyles[":hover"],
      borderColor: "#9ca3af",
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#9F90C0" : undefined,
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#9F90C0", // Custom background color
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Custom text color
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Custom text color
    ":hover": {
      backgroundColor: "#B7A6DD", // Custom hover background color
    },
  }),
};

export default function MultiSelectInput({
  inputParams,
  errors,
  label,
  options,
  placeholder,
  formControl,
}) {
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
            value={options.filter((c) => value?.includes(c.value))}
            onChange={(values) => onChange(values.map((v) => v.value))}
            styles={multiSelectInputStyles}
          />
        )}
      />
      <p className="h-8 text-vermillion">{errors && errors?.message}</p>
    </div>
  );
}
