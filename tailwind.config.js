const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './lib/**/*.js',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};