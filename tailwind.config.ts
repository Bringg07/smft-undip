import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet warna baru menyesuaikan logo (Hitam & Perak Metalik)
        parlemen: {
          DEFAULT: "#09090B",
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
          950: "#09090B",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#FBF6E8",
          100: "#F5E9C4",
          200: "#EBD48D",
          300: "#E0BE56",
          400: "#D4AF37", // Warna Panah Emas
          500: "#B8952A",
          600: "#8F7420",
          700: "#665318",
          800: "#3D320E",
          900: "#1F1907",
        },
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        // Gradient disesuaikan dengan nuansa hitam-perak metalik logo Parlemen
        "parlemen-gradient": "linear-gradient(180deg, #18181B 0%, #27272A 45%, #09090B 100%)",
        "gold-glow": "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0) 70%)",
      },
      boxShadow: {
        "gold-sm": "0 0 20px rgba(212,175,55,0.25)",
        "gold-lg": "0 0 60px rgba(212,175,55,0.2)",
        glass: "0 8px 32px rgba(0,0,0,0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;