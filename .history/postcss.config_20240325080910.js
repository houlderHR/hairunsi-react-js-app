export default {
  plugins: {
    tailwindcss: {
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      theme: {
        inset: {
          '0': 0,
        },
        extend: {
          colors: {
            primary: '#12103B',
            grey1: '#DEDEDE',  
            grey2: '#808080',   
            black1: '#272727',       
          },
          fontFamily: {
            ubuntu: ['Ubuntu', 'sans-serif'],
          },
          fontSize: {
            menu: '36px',
          }
        },
      },
    },
    autoprefixer: {},
  },
}
