/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['DM Sans', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          60: 'rgb(var(--primary-60) / <alpha-value>)',
          40: 'rgb(var(--primary-40) / <alpha-value>)',
        },
        error: {
          50: 'rgb(var(--error-50) / <alpha-value>)',
          60: 'rgb(var(--error-60) / <alpha-value>)',
        },
        surface: {
          1: 'rgb(var(--surface-1) / <alpha-value>)',
          2: 'rgb(var(--surface-2) / <alpha-value>)',
          3: 'rgb(var(--surface-3) / <alpha-value>)',
          4: 'rgb(var(--surface-4) / <alpha-value>)',
          5: 'rgb(var(--surface-5) / <alpha-value>)',
        },
        orange: 'rgb(var(--orange) / <alpha-value>)',
        blue: 'rgb(var(--blue) / <alpha-value>)',
        main: 'rgb(var(--main) / <alpha-value>)',
        back: 'rgb(var(--back) / <alpha-value>)'
      },
      boxShadow: {
        sm: `-1px -1px 4px 1px var(--surface-1), 1px 1px 4px var(--surface-5)`,
        inset: 'inset -1px -1px 4px 1px rgba(255, 255, 255, 0.5), inset 1px 1px 4px #E2E1EC',
        glow: '0px 0px 16px var(--surface-5), 0px 0px 4px var(--surface-1), 0px 0px 8px var(--surface-2)',
      },
      animation: {
        'slide-left': 'slide-left .2s cubic-bezier(0, 0, 0.2, 1)',
        'squeeze': 'squeeze 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        'squeeze': {
          '0%,100%': { transform: 'scaleY(100%)' },
          '50%': { transform: 'scaleY(70%)' }
        }
      }
    },
  },
  plugins: [require("tailwindcss"), require("precss"), require("autoprefixer")],
}
