/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFD100",
          "yellow-dim": "rgba(255, 209, 0, 0.18)",
          "yellow-glow": "rgba(255, 209, 0, 0.35)",
          black: "#080808",
          dark: "#0d0d0d",
          card: "rgba(14, 14, 14, 0.90)",
          "card-hover": "rgba(20, 20, 20, 0.95)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Syne", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      boxShadow: {
        "amber-glow": "0 0 28px rgba(255, 209, 0, 0.25)",
        "amber-glow-lg": "0 0 45px rgba(255, 209, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
