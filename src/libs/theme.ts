"use client";

import { createTheme } from "@mui/material/styles";
import { Ruda } from "next/font/google";

const ruda = Ruda({ subsets: ["latin"] });

const kollageTheme = createTheme({
  typography: {
    fontFamily: ruda.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#4296c1",
      light: "#E5F2FE",
      dark: "#3880A5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#c93e8f",
      light: "#f3e2f5",
      dark: "#AC357B",
      contrastText: "#fff",
    },
  },
});

export default kollageTheme;
