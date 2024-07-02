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
      }
    },
  },
  plugins: [],
};
