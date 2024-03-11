/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ["lato", "helvetica neue", "helvetica", "arial", "sans-serif"],
    },
    colors: {
      ...colors,
      babyblue: {
        DEFAULT: "#87C6E4",
        dark: "#75ACC6",
      },
      darkblue: {
        DEFAULT: "#1B3C6C",
        dark: "#132B4E",
        light: "#224B88",
      },
      gold: {
        DEFAULT: "#FFB703",
        dark: "#E2A302",
      },
      orange: {
        DEFAULT: "#FB5600",
        dark: "#DD4D00",
        light: "#FA7B38",
      },
    },
    extend: {},
  },
  plugins: [],
};
