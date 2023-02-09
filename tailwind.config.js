/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "white": "#FFF",
      "primary": "#6559fe",
      "custom-gray": {
        "300": "#f6f8fa",
        "200": "#E7E7E9"
      },
      "agora": {
        "500": "#6559fe",
        "300": "#eeedfd"
      },
    },
    extend: {
      fontFamily: {
        poppins: ["'Poppins'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
