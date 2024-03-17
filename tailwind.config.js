/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ["lato", "helvetica neue", "helvetica", "arial", "sans-serif"],
      serif: ["Perpetua Titling MT", "Baskerville", "Palatino", "serif"],
    },
    colors: {
      ...colors,
      lilac: {
        DEFAULT: "#B78FE4",
        dark: "#9F7DC6",
        light: "#E9DDFF",
      },
      violet: {
        DEFAULT: "#39316D",
        dark: "#2A2451",
        light: "#584CA8",
      },
      salmon: {
        DEFAULT: "#F48C7C",
        dark: "#D87C6E",
      },
      vermillion: {
        DEFAULT: "#FB5644",
        dark: "#DD4C3C",
        light: "#FA6656",
      },
    },
    extend: {},
  },
  plugins: [],
};
