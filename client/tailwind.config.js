/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primario: "#1A1A1A",
        secundario: "#39BFF0",
        terciario: "#2E2D2D",
        tipografia: "#9C9999",
        fondoWebApp: "#D9D9D9",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
