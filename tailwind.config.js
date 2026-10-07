export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nawab: {
          black: '#121212',
          gold: '#D4AF37',
          darkGreen: '#013220',
          burgundy: '#800020'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
