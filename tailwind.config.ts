import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: "#100820",
          card: "#1c0f3a",
          border: "#5b21b6",
          borderLight: "#3b1f7a",
          label: "#c084fc",
          muted: "#94a3b8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
