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
        hb: {
          dark: '#07090e',
          card: '#0f141d',
          cardHover: '#161d2a',
          sidebar: '#0a0d13',
          border: 'rgba(255, 255, 255, 0.07)',
          borderHover: 'rgba(255, 255, 255, 0.16)',
          green: '#00E701',
          greenHover: '#00c801',
          greenGlow: 'rgba(0, 231, 1, 0.25)',
          red: '#ff4d4d',
          gold: '#f59e0b',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          muted: '#8e9cae',
          text: '#f1f5f9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 231, 1, 0.25)',
        'glow-green-sm': '0 0 10px rgba(0, 231, 1, 0.2)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'odds-up': 'oddsUp 1.2s ease-out',
        'odds-down': 'oddsDown 1.2s ease-out'
      },
      keyframes: {
        oddsUp: {
          '0%': { backgroundColor: 'rgba(0, 231, 1, 0.4)' },
          '100%': { backgroundColor: 'transparent' }
        },
        oddsDown: {
          '0%': { backgroundColor: 'rgba(255, 77, 77, 0.4)' },
          '100%': { backgroundColor: 'transparent' }
        }
      }
    },
  },
  plugins: [],
}
