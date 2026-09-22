/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: 'var(--brand-light, #60a5fa)',
          DEFAULT: 'var(--brand-main, #3b82f6)',
          dark: 'var(--brand-dark, #2563eb)',
        },
        gradientStart: 'var(--gradient-start, #3b82f6)',
        gradientEnd: 'var(--gradient-end, #8b5cf6)',
      },
    },
  },
  plugins: [],
}
