/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          600: '#0891b2',
          700: '#0e7490',
          900: '#164e63'
        }
      },
      boxShadow: {
        panel: '0 1px 2px rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: []
}

