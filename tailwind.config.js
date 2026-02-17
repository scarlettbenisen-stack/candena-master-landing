/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          950: "#0B0B0B",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.10), 0 20px 80px rgba(255,179,71,0.18)",
      },
    },
  },
  plugins: [],
}

