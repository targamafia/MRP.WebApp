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
          100: 'var(--neutral-100)',
          99: 'var(--neutral-99)',
          95: 'var(--neutral-95)',
          90: 'var(--neutral-90)',
          80: 'var(--neutral-80)',
          70: 'var(--neutral-70)',
          60: 'var(--neutral-60)',
          50: 'var(--neutral-50)',
          40: 'var(--neutral-40)',
          30: 'var(--neutral-30)',
          20: 'var(--neutral-20)',
          10: 'var(--neutral-10)',
          0: 'var(--neutral-0)',
        },
        surface: {
          1: 'var(--surface-5)',
          2: 'var(--surface-4)',
          3: 'var(--surface-3)',
          4: 'var(--surface-2)',
          5: 'var(--surface-1)',
        },
        orange: '#D58A3F',
        blue: '#2C5F86',
        main: 'var(--main)',
        back: 'var(--back)'
      },
      boxShadow: {
        sm: `-1px -1px 4px 1px var(--surface-1), 1px 1px 4px var(--surface-5)`,
        inset: 'inset -1px -1px 4px 1px rgba(255, 255, 255, 0.5), inset 1px 1px 4px #E2E1EC',
        glow: '0px 0px 16px var(--neutral-90), 0px 0px 2px var(--neutral-100)',
      },
      fontFamily: {
        title: ['DM Sans', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss"), require("precss"), require("autoprefixer")],
}
