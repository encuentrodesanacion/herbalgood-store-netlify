/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#10B981",
        "light-green": "#D1FAE5",
        "dark-slate": "#1F2937",
        "brand-bg": "#E6F4EA", 
        // 🌸 NUEVO COLOR AQUÍ:
        "brand-rose": "#D4A5A5", 
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};