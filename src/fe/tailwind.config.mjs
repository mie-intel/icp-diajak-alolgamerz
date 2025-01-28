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
