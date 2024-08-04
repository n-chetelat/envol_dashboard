/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: "var(--font-sans)",
      serif: ["'Perpetua Titling MT'", "var(--font-serif)"],
    },
    extend: {
      colors: {
        lilac: {
          DEFAULT: "#9F90C0",
          dark: "#867AA2",
          light: "#B7A6DD",
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
        success: {
          DEFAULT: "#22C55E",
          light: "#4ADE80",
          dark: "#16A34A",
        },
      },
      boxShadow: {
        "radio-ring-focus":
          "0 0 0 2px rgba(57, 49, 109, 0.3), 0 0 0 4px rgba(57, 49, 109, 0.2)",
      },
    },
  },
  plugins: [],
};
