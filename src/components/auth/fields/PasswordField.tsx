"use client";

import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";

type PasswordFieldProps = {
  error: boolean;
  classes: string;
  name: string;
  label: string;
  helperText?: string;
};

export default function PasswordField({
  error,
  classes,
  name,
  label,
  helperText,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      name={name}
      className={classes}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
