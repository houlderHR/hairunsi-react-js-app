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
          },
          fontFamily: {
            ubuntu: ['Ubuntu', 'sans-serif'],
          }
        },
      },
    },
    autoprefixer: {},
  },
}
