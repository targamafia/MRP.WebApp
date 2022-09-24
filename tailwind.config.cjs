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
          100: '#FFFFFF',
          99: '#FEFBFF',
          95: '#F2F0F4',
          90: '#E4E1E6',
          80: '#C8C6CA',
          70: '#ACAAAF',
          60: '#919094',
          50: '#77767A',
          40: '#5E5E62',
          30: '#47464A',
          20: '#303034',
          10: '#1B1B1F',
          0: '#000000',
        },
        surfaces: {
          light: {
            1: '#FEFBFF',
            2: '#EFEEF8',
            3: '#E9E9F6',
            4: '#E7E8F5',
            5: '#E3E4F4',
          },
          dark: {
            1: '#1B1B1F',
            2: '#272931',
            3: '#2C2E38',
            4: '#2E2F3A',
            5: '#31333E',
          },
        },
        orange: '#D58A3F',
        blue: '#2C5F86',
      },
      boxShadow: {
        sm: '-1px -1px 4px 1px #FFFFFF, 1px 1px 4px #E2E1EC',
        inset: 'inset -1px -1px 4px 1px rgba(255, 255, 255, 0.5), inset 1px 1px 4px #E2E1EC'
      },
      fontFamily: {
        title: ['DM Sans', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss"), require("precss"), require("autoprefixer")],
}
