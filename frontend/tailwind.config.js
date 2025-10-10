// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#10B981", // Emerald Green (Acento principal)
        "light-green": "#D1FAE5", // Light Emerald for subtle backgrounds
        "dark-slate": "#1F2937", // Dark Gray/Text color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
