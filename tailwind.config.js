/** @type {import('tailwindcss').Config} */

import tailwindColors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/pages/**/*.tsx', './src/core-components/**/*.tsx', './src/app/**/*.tsx'],
  theme: {
    colors: {
      black: '#202125',
      white: '#fff',
      green: '#5bcb02',
      red: {
        light: tailwindColors.red[300],
        DEFAULT: tailwindColors.red[500],
        dark: tailwindColors.red[700],
      },
      grey: {
        1: '#f8f8f8',
        2: '#eee',
        3: '#a1a2a4',
      },
    },
    fontFamily: {
      sans: ['var(--font-roboto)', 'sans-serif'],
    },
    fontSize: {
      xl: ['24px', '30px'],
      lg: ['20px', '28px'],
      base: ['16px', '22px'],
      sm: ['14px', '20px'],
      xs: ['12px', '16px'],
    },
  },
  plugins: [],
};
