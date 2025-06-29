/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefafc',
          100: '#d3f1f7',
          200: '#abe3ef',
          300: '#73cfe2',
          400: '#33b4cc',
          500: '#19647e',
          600: '#155a72',
          700: '#154e63',
          800: '#164354',
          900: '#183948',
          950: '#0d232d',
        },
        secondary: {
          50: '#eefcfc',
          100: '#d5f6f6',
          200: '#b0ecee',
          300: '#79dfe2',
          400: '#28afb0',
          500: '#1c9697',
          600: '#197a7b',
          700: '#1a6465',
          800: '#1c5152',
          900: '#1c4445',
          950: '#0a2627',
        },
        accent: {
          50: '#fef9e8',
          100: '#fdf1c4',
          200: '#fbe489',
          300: '#f9d24f',
          400: '#f7c22b',
          500: '#f4d35e',
          600: '#e8ac0a',
          700: '#be860b',
          800: '#996811',
          900: '#7d5512',
          950: '#432d07',
        },
      },
    },
  },
  plugins: [],
}
