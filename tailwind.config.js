/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'Monoton': ['Monoton', 'cursive'],
      'Righteous': ['Righteous', 'cursive']
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
