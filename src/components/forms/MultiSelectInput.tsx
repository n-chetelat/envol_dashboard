"use client";

import React from "react";
import Select, { StylesConfig, MultiValue, GroupBase } from "react-select";
import { Controller, Control, FieldError } from "react-hook-form";
import { useId } from "react";

// Define a generic type for the option value
type OptionType<T> = {
  label: string;
  value: T;
};

// Update the props interface to use generics
interface MultiSelectInputProps<T> {
  inputParams: any;
  errors: FieldError | undefined;
  label: string;
  options: OptionType<T>[];
  placeholder: string;
  formControl: Control<any>;
}

export default function MultiSelectInput<T>({
  inputParams,
  errors,
  label,
  options,
  placeholder,
  formControl,
}: MultiSelectInputProps<T>) {
  const selectId = useId();

  const multiSelectInputStyles: StylesConfig<
    OptionType<T>,
    true,
    GroupBase<OptionType<T>>
  > = {
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
          <Select<OptionType<T>, true>
            instanceId={selectId}
            name={name}
            ref={ref}
            placeholder={`${placeholder}...`}
            options={options}
            isMulti
            value={options.filter(
              (c) => Array.isArray(value) && value.some((v) => v === c.value),
            )}
            onChange={(newValue: MultiValue<OptionType<T>>) => {
              onChange(newValue.map((v) => v.value));
            }}
            styles={multiSelectInputStyles}
          />
        )}
      />
      <p className="h-8 text-vermillion">{errors?.message}</p>
    </div>
  );
}
