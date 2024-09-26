/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/api/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/*.{js,ts,jsx,tsx,mdx}",
    "./app/create/*.{js,ts,jsx,tsx,mdx}",
    "./app/delete/*.{js,ts,jsx,tsx,mdx}",
    "./app/download/*.{js,ts,jsx,tsx,mdx}",
    "./app/map/*.{js,ts,jsx,tsx,mdx}",
    "./app/rename/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

