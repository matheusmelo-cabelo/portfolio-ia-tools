/** @type {import('tailwindcss').Config} */
import twAnimate from 'tw-animate-css';

export default {
  content: [
    "./index.html",
    "./App.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    twAnimate,
  ],
}