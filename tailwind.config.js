/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "custom-gray": "#f5f5f5",
        "custom-red": "#ff0000",
        "custom-yellow": "#ffdd57",
        "custom-rose": "#ff3860",
        "custom-indigo": "#4f6df5",
      },
      boxShadow: {
        "custom-bottom": " 0 3px 5px 0 rgba(0, 0, 0, .3)",
      },
    },
  },
  plugins: [],
};
