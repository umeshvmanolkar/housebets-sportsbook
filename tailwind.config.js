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
        stake: {
          bg: '#0f212e',
          surface: '#1a2c38',
          card: '#213743',
          cardHover: '#2a4454',
          inset: '#071822',
          border: 'rgba(255, 255, 255, 0.07)',
          borderHover: 'rgba(255, 255, 255, 0.15)',
          blue: '#1475e1',
          cyan: '#00A3FF',
          green: '#00e701',
          text: '#ffffff',
          subtext: '#b1bad3',
          muted: '#557086'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 163, 255, 0.3)',
        'glow-blue': '0 0 20px rgba(20, 117, 225, 0.35)',
        'card-elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.45)'
      }
    },
  },
  plugins: [],
}
