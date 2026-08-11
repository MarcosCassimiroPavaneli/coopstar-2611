import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0066CC",
          sky: "#0099CC",
          navy: "#20668B",
          red: "#CC0000",
          darkred: "#990000",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Arial", "sans-serif"],
      },
      maxWidth: {
        container: "72rem",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgb(0 0 0 / 0.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
