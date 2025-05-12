/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'background-dark': 'rgb(3, 7, 18)',
        'background-card': '#161824',
        'accent-blue': '#3b82f6',
        'accent-pink': '#ff66ab',
        'accent-green': '#6fdd8b',
        'text-light': '#ffffff',
        'text-secondary': '#a0a0b0',
        osu: "#ff66ab",
        yuzu: "#6699ff"
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        poppins: ["Poppins", "sans-serif"]
      },
      boxShadow: {
        'card': '0 14px 25px rgba(59, 130, 246, 0.3)',
        'btn': '0 4px 12px rgba(255, 102, 171, 0.4)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
} 