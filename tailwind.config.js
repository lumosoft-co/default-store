/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "white": "#FFF",
      "primary": "#6559fe",
      "customn-white": {
        "200": "#F0F0F0",
      },
      "custom-gray": {
        "600": "#C7C9DF",
        "500": "#6A6A6A",
        "300": "#A5A5BB",
        "200": "#E0E8FE",
        "100": "#F0F0F0"
      },
      "agora": {
        "500": "#6559fe",
        "300": "#eeedfd"
      },
      "theme-color": {
        "500": "#242132",
      },
      "custom-purple": {
        "500": "#B189FF",
        "600": "#a487ff"
      },
      "card-background": {
        "500": "#282843"
      }
    },
    extend: {
      fontFamily: {
        poppins: ["'Poppins'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
