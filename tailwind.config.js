/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        mono: ['Outfit', 'sans-serif'],
      },
      colors: {
        'petrack-green': 'rgba(4, 93, 90, 1)',
        'petrack-yellow': 'rgba(233, 144, 3, 1)',
        'petrack-black': 'rgba(22, 22, 22, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
