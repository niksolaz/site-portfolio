import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette 2026 (stile editoriale). Sintassi OKLCH con <alpha-value>
        // così funzionano anche le trasparenze (es. text-ink/70, bg-primary/10).
        primary: "oklch(0.35 0.12 190 / <alpha-value>)", // Deep Teal  (#004d4d)
        "primary-light": "oklch(0.48 0.11 190 / <alpha-value>)", // Teal piu chiaro per hover
        accent: "oklch(0.78 0.19 80 / <alpha-value>)", // Ambra/Oro  (#ffb300)
        base: "oklch(0.97 0.01 75 / <alpha-value>)", // Crema      (#f9f6f0)
        ink: "oklch(0.27 0.04 240 / <alpha-value>)", // Slate scuro (#1e293b)
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
