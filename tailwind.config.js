/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        emoji: ['Noto Color Emoji', 'sans-serif'],
        display: ['Teko'],
        sans: ['Work Sans', 'sans-serif']
      },
      gridTemplateColumns: {
        'club-list': '4rem minmax(4rem, 2fr) 1fr',
        'club-list-md': '4rem minmax(4rem, 2fr) repeat(4, minmax(0, 1fr))',
        'brawler-list': '4rem minmax(4rem, 2fr) repeat(3, minmax(0, 1fr))',
        'brawler-list-md': '4rem minmax(4rem, 2fr) repeat(4, minmax(0, 1fr))'
      },
      borderWidth: {
        3: '3px'
      }
    }
  },
  plugins: []
}
