export default {
  plugins: {
    tailwindcss: {
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      theme: {
        extend: {
          colors: {
            primary: '#12103B',
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
