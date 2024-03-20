/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary":"#12103B",
        "secondary":"#2B335B",
        "secondary-2": "#3E60C1",
        "secondary-light":"#F7F7FF",
        "black-1":"#272727",
        "blue-3":"#3E60C1",
        "gray-1":"#808080",
        "gray-2":"#DDDDDD",
        "gray-3":"#EEEEEE",
        "white-1":"#F0F0F0"
      },
      'display': ['Ubuntu',],
    },
  },
  plugins: [],
}

