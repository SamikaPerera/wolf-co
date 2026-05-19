/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'],
        condensed: ['"Barlow Condensed"', 'sans-serif'],
      },
      colors: {
        black: '#0a0a0a',
        white: '#f5f5f0',
        accent: '#c9a96e',
        'gray-dark': '#1a1a1a',
        'gray-mid': '#2a2a2a',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
