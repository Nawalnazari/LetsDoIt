/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6750A4',
          container: '#EADDFF',
          dark: '#4F378B',
        },
        secondary: '#625B71',
        surface: '#FFFBFE',
        error: '#B3261E',
      },
    },
  },
  plugins: [],
};
