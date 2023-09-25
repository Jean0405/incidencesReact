/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '0px',       // Extra Small
        'sm': '476px',     // Small
        'md': '668px',     // Medium
        'lg': '992px',     // Large
        'xl': '1200px',    // Extra Large
      },
    },
  },
  plugins: [require("rippleui")],
}