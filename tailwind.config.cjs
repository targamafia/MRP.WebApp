/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFFFFF',
          99: '#FEFBFF',
          95: '#EFF0FF',
          90: '#DCE1FF',
          80: '#B6C4FF',
          70: '#8FA7FF',
          60: '#748CE4',
          50: '#5972C8',
          40: '#4059AD',
          30: '#254193',
          20: '#02287C',
          10: '#00164F',
          0: '#000000',
        },
        error: {
          50: '#DE3730',
          60: '#FF5449',
          70: '#FF897D',
          80: '#FFB4AB',
        },
        neutral: {
          100: 'rgb(var(--neutral-100) / <alpha-value>)',
          99: 'rgb(var(--neutral-99) / <alpha-value>)',
          95: 'rgb(var(--neutral-95) / <alpha-value>)',
          90: 'rgb(var(--neutral-90) / <alpha-value>)',
          80: 'rgb(var(--neutral-80) / <alpha-value>)',
          70: 'rgb(var(--neutral-70) / <alpha-value>)',
          60: 'rgb(var(--neutral-60) / <alpha-value>)',
          50: 'rgb(var(--neutral-50) / <alpha-value>)',
          40: 'rgb(var(--neutral-40) / <alpha-value>)',
          30: 'rgb(var(--neutral-30) / <alpha-value>)',
          20: 'rgb(var(--neutral-20) / <alpha-value>)',
          10: 'rgb(var(--neutral-10) / <alpha-value>)',
          0: 'rgb(var(--neutral-0) / <alpha-value>)',
        },
        surface: {
          1: 'rgb(var(--surface-1) / <alpha-value>)',
          2: 'rgb(var(--surface-2) / <alpha-value>)',
          3: 'rgb(var(--surface-3) / <alpha-value>)',
          4: 'rgb(var(--surface-4) / <alpha-value>)',
          5: 'rgb(var(--surface-5) / <alpha-value>)',
        },
        orange: '#D58A3F',
        blue: '#2C5F86',
        main: 'rgb(var(--main) / <alpha-value>)',
        back: 'rgb(var(--back) / <alpha-value>)'
      },
      boxShadow: {
        sm: `-1px -1px 4px 1px var(--surface-1), 1px 1px 4px var(--surface-5)`,
        inset: 'inset -1px -1px 4px 1px rgba(255, 255, 255, 0.5), inset 1px 1px 4px #E2E1EC',
        glow: '0px 0px 16px var(--surface-5), 0px 0px 4px var(--surface-1), 0px 0px 8px var(--surface-3)',
      },
      fontFamily: {
        title: ['DM Sans', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss"), require("precss"), require("autoprefixer")],
}
