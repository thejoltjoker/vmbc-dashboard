/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Teko'],
        sans: ['Work Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
