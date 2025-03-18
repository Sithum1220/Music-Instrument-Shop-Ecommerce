/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryDark:"#481E14",
        primary:"#B4846C",
        secendary:"#A67B5B",
        secendaryDark:"#543310"
      },
      fontFamily:{
        inter:["Inter","sans-serif"],
        cursive:["Ephesis","cursive"]
      },
      container:{
        center:true,
        padding:{
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
        }
      }
    },
  },
  plugins: [],
}