/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        offset: "4px 4px 6px rgba(0, 0, 0, 0.25)",
        "offset-lg": "8px 8px 12px rgba(0, 0, 0, 0.3)",
        "offset-left": "-4px 4px 6px rgba(0, 0, 0, 0.25)",
        "offset-lg-left": "-8px 8px 12px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "#FFFFFF",
        grey: "#F4F7FE",
        lightpurple: "#A3BDFF",
        purple: "#A3AED0",
        darkpurple: "#3F45A5",
        blackpurple: "#2B3674",
      },
      fontFamily: {
        dmSans: ["dmSans", "sans-serif"],
        dmSansRegular: ["dmSansRegular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
