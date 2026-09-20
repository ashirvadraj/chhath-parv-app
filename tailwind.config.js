/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chhath: {
          saffron: '#EA580C',
          sindoor: '#DC2626',
          gold: '#F59E0B',
          amber: '#D97706',
          marigold: '#FBBF24',
          cream: '#FFFBEB',
          dawn: '#FEF3C7',
          river: '#0369A1',
          night: '#0B0F19',
          surface: '#131927',
          card: '#1C2438',
          cardLight: '#FFFFFF',
          borderLight: '#FDE68A',
          borderDark: '#334155'
        }
      },
      fontFamily: {
        devanagari: ['"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'divine': '0 4px 20px -2px rgba(245, 158, 11, 0.25)',
        'divine-lg': '0 10px 25px -3px rgba(234, 88, 12, 0.3)',
      }
    },
  },
  plugins: [],
}
