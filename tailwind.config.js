const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './content/**/*.mdx',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
};