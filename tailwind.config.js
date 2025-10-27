/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef6ee',
          100: '#fdecd7',
          200: '#fad4ad',
          300: '#f7b479',
          400: '#f38a43',
          500: '#f0691e',
          600: '#e15014',
          700: '#ba3b12',
          800: '#943117',
          900: '#772b16',
        },
      },
    },
  },
  plugins: [],
}
