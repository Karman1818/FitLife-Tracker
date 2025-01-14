import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "vue": {
          "black": {
            "DEFAULT": "#181818",
            "soft": "#222222",
            "mute": "#282828",
          },
          "indigo": "#2c3e50",
          "white": {
            "DEFAULT": "#ffffff",
            "soft": "#f8f8f8",
            "mute": "#f2f2f2",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-debug-screens"),
  ],
} satisfies Config;
