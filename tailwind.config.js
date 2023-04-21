const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "sm" : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      }
    },
    colors: {
      darkTheme : '#343541',
      sidebar : '#202123',
      faint : '#696969',
      chatGPT : '#0BA37F',
      amber: colors.amber,
      emerald: colors.emerald,
      white : colors.white,
      black : colors.black, 
      slate : colors.slate,
      cyan : colors.cyan,
      blue : colors.blue,
      magenta: colors.magenta,
      purple : colors.purple,
      pink : colors.pink,
      red : colors.red,
      gray : colors.gray,
      transparent : colors.transparent,
    },
    screens: {
      'xs': "200px" ,
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
