/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: '#213D32',   // deep pine — primary
        moss: '#5B7F66',     // mid green
        clay: '#C1714A',     // warm terracotta accent
        mist: '#DDE6DE',     // pale sage surface
        paper: '#F2EEE3',    // warm parchment background
        ink: '#232922',      // near-black text
        gold: '#D9A441',     // ratings / highlights
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Work Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
