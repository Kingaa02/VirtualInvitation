/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beer: {
          amber: {
            300: '#fbbf24',
            400: '#f59e0b',
            500: '#d97706',
            600: '#b45309',
          },
          foam: '#fff5d6',
          dark: '#1a1a2e',
        },
        celebration: {
          gold: '#ffd700',
          orange: '#ff8c00',
        }
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bubble-rise': 'bubbleRise 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(251, 191, 36, 0.8)' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-20px) scale(0.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}