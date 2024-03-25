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
          },
          fontFamily: {
            ubuntu: ['Ubuntu', 'sans-serif'],
          },
          fontSize: {
            
          }
        },
      },
    },
    autoprefixer: {},
  },
}
