/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          850: "#7971FF",
          450: "#4E48B1",
          250: "#DCE5FF"
        },
        slate: {
          50: "#F9FAFC"
        }
      }
    },
  },
  plugins: [],
}

