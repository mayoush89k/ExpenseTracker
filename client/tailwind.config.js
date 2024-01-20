/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "white": "#fcfcfc",
      "black": "#000",
      "light-1": "#FFD28F",
      "light-2": "#FFE3BB",
      "light-3": "#B4BDFF",
      "light-4": "#83A2FF",
      
      "dark-1": "#F5E8C7",
      "dark-2": "#818FB4",
      "dark-3": "#435585",
      "dark-4": "#363062"
    },
    extend: {},
  },
  plugins: [],
}

