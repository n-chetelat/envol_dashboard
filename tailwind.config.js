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
        error: {
          DEFAULT: "#FB5644",
          dark: "#DD4C3C",
          light: "#FA6656",
        },
        success: {
          DEFAULT: "#63A583",
        },
        warning: {
          DEFAULT: "#FADF43",
        },
      },
      boxShadow: {
        "radio-ring-focus":
          "0 0 0 2px rgba(57, 49, 109, 0.3), 0 0 0 4px rgba(57, 49, 109, 0.2)",
      },
      keyframes: {
        "change-colors": {
          "0%, 100%": { stroke: "#9F90C0" },
          "50%": { stroke: "#39316D" },
        },
      },
      animation: {
        "spin-change-color":
          "spin 3s linear infinite, change-colors 3s linear infinite",
      },
      gridTemplateColumns: {
        "static-2": "repeat(2, 6rem)",
        "static-4": "repeat(4, 6rem)",
      },
    },
  },
  plugins: [],
};
