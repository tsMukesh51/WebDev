/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          200: '#00ffff',
          850: '#00274E',
          750: '#00295F'
        }
      }
    },
  },
  plugins: [],
}

