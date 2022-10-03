/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pnc-orange": "#EF5500",
        "pnc-blue": "#092D67",
        "pnc-grey": "#999999",
        "pnc-black": "#000000",
      },
    },
  },
  plugins: [],
};