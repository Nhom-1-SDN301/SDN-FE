/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark': 'var(--bg-dark)',
      },
      textColor: {
        'dark': 'var(--text-dark)',
      },
      borderColor: {
        'dark': 'var(--border-dark)',
      },
    },
  },
  plugins: [],
}

