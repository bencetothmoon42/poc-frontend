/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: ['16px', '19px']
    },
    letterSpacing: {
      wide: ".07125em",
      wider: ".0975em"
    },
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'] 
      },
      colors: {
        "pnc-orange": "#EF5500",
        "pnc-blue": "#092D67",
        "pnc-grey": "#999999",
        "pnc-black": "#000000",
        "pnc-white": "#FFFFFF"
      },
      backgroundImage: {
        'checkbox': "url('../public/icons/checkbox-checked.svg')",
      },
      animation: {
        fadeIn: 'fadeIn 0.4s forwards',
        fadeOut: 'fadeOut 0.4s forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, marginTop: '-10px' },
          '100%': { opacity: 1, marginTop: 0},
        },
        fadeOut: {
          '0%': { opacity: 1, marginTop: 0 },
          '100%': { opacity: 0, marginTop: '-10px' },
        }
      },
    },
  },
  plugins: [],
};