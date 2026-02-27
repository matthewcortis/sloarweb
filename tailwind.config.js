/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sf: [
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1s infinite",
      },
      fontSize: {
        h1: ['32px', { lineHeight: '32px', fontWeight: '600' }],
        h2: ['21px', { lineHeight: '21px', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '22px', fontWeight: '600' }],
        title: ['17px', { lineHeight: '22px', fontWeight: '600' }],
        button: ['16px', { lineHeight: '22px', fontWeight: '600' }],
        body: ['16px', { lineHeight: '22px', fontWeight: '400' }],
        caption: ['16px', { lineHeight: '22px', fontWeight: '400' }],
        'display-32': ['32px', { lineHeight: '1', letterSpacing: '0em', fontWeight: '600' }],
        'title-16': ['16px', { lineHeight: '1', letterSpacing: '0em', fontWeight: '600' }],
        'body-16': ['16px', { lineHeight: '1', letterSpacing: '0em', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
