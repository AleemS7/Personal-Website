/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['SF Pro Display', 'Inter', 'sans-serif'],
      },
      colors: {
        'silencio-bg': '#000000',
        'silencio-text': '#ffffff',
        'dark-bg': '#1a1a1a',
        'dark-text': '#e0e0e0',
      },
    },
  },
  plugins: [],
};
