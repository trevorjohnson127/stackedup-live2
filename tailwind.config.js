/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'mint-100': '#d1fbe7',
        'mint-300': '#94f0d2',
        'mint-600': '#4cd7ae',
        'mint-dark': '#2c8c72',
        'cream-white': '#fffef8',
      },
    },
  },
  plugins: [],
};
