/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        'neutralSilver':'#F5F7FA',
        'neutralDGrey':'#4D4D4D',
        'brandPrimary':'#0574bd',
        'neutralGrey':'#717171',
        'grey900':'#1819F'
      }
    },
  },
  plugins: [flowbite.plugin()],
}
