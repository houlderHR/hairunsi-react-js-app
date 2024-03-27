/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#12103B',
        secondary: '#2B335B',
        'secondary-2': '#3E60C1',
        'secondary-3': '#CAC8FF',
        'secondary-light': '#F7F7FF',
        'black-1': '#272727',
        'blue-3': '#3E60C1',
        'gray-1': '#808080',
        'gray-2': '#DDDDDD',
        'gray-3': '#EEEEEE',
        'white-1': '#F0F0F0',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      fontSize: {
        '10px': '10px',
      },
      spacing: {
        '2px': '2px',
        '4px': '4px',
        '8px': '8px',
        ssm: '20px',
        llg: '62px',
      },
    },
  },
  plugins: [],
};
