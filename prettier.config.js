module.exports = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "react*",
    "next*",
    "<THIRD_PARTY_MODULES>",
    "^@/(libs|hooks|store|contexts)/(.*)$",
    "^@/validations/(.*)$",
    "^@/components/(.*)$",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
};
