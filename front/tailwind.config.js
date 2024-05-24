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
        'gray-4': '#BDBDBD',
        'gray-5': '#EAEAEA',
        'gray-6': '#FAFAFA',
        'gray-7': '#DEDEDE',
        'gray-8': '#F9F9F9',
        'gray-9': '#D7D7D7',
        'danger-2': '#EF4F4E',
        'white-1': '#F0F0F0',
        'purple-1': '#667799',
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
        mmd: '56px',
        llg: '62px',
      },
      screens: {
        smd: '1000px',
        lgg: '1599px',
      },
    },
  },
  plugins: [],
};
