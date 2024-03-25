/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#12103B',     
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      spacing: {
        ssm: '20px',
        llg: '62px',
      }
    },
  },
  plugins: [],
}

