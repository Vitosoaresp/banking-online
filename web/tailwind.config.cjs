/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "bg-animation": "url('./src/assets/bg-animation.svg')",
        "login-animation": "url('./src/assets/bg-animation2.svg')",
      }
    },
  },
  plugins: [],
}
