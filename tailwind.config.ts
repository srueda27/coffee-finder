import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
          gradient: "url('/static/mesh-gradient.png')"
      },
      colors: {
        purple: {
          951: 'rgba(79, 70, 229, 1)',
        },
        gray: {
          950: 'hsla(0, 0%, 100%, 0.7);',
          951: 'hsla(0, 0%, 100%, 0.4);',
          952: '#373b64',
        },
      },/* ,
      padding: {
        13: '150px'
      } */
    },
  },
  plugins: [],
} satisfies Config;
