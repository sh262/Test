/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        textColor: 'var(--text)',
        cardBg: 'var(--card)',
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
    },
  },
  plugins: [],
};