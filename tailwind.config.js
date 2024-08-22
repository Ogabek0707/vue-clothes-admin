/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        global1: "rgb(25, 118, 210)",
        global2: "#E5E5E5",
        global3: "#fafafad9",
        error_color: "red",
        global4: "rgba(0, 0, 0, 0.54)",
        hover: "rgba(0, 98, 255, 0.308)"
      }
    },
  },
  plugins: [],
}
