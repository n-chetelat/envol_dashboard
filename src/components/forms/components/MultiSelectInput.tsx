"use client";

import useTranslatedError from "@/hooks/useTranslatedError";
import { useId } from "react";
import { Control, useController } from "react-hook-form";
import Select, { GroupBase, MultiValue, StylesConfig } from "react-select";

// Define a generic type for the option value
type OptionType<T> = {
  label: string;
  value: T;
};

// Update the props interface to use generics
interface MultiSelectInputProps<T> {
  name: string;
  label: string;
  options: OptionType<T>[];
  placeholder: string;
  control: Control<any>;
  required: boolean;
}

export default function MultiSelectInput<T>({
  name,
  label,
  options,
  placeholder,
  control,
  required,
}: MultiSelectInputProps<T>) {
  const selectId = useId();

  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const translatedError = useTranslatedError(error);

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
      <label htmlFor={selectId}>
        {label}
        {required && <span className="font-bold text-violet">*</span>}
      </label>
      <Select<OptionType<T>, true>
        instanceId={selectId}
        name={name}
        ref={ref}
        placeholder={`${placeholder}...`}
        options={options}
        isMulti
        value={options.filter(
          (c) => Array.isArray(value) && value.includes(c.value),
        )}
        onChange={(newValue: MultiValue<OptionType<T>>) => {
          onChange(newValue.map((v) => v.value));
        }}
        styles={multiSelectInputStyles}
      />
      <p className="h-8 text-error">{translatedError?.message}</p>
    </div>
  );
}
