/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth-bg": "url('/images/bg.svg')",
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "50%": "50%",
        "100%": "100%",
        16: "4rem",
      },
      colors: {
        "grey-primary": "#7E8B9E",
        "blue-primary": "#3568FF",
        "black-secondary": "#323A46",
        "off-white": "#CBD1D8",
        "blue-secondary": "#59B5FF",
      },
    },
  },
  plugins: [],
};
