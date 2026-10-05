/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#03050c',
          900: '#060919',
          800: '#0c122e',
          700: '#161f4a',
        },
        gemini: {
          cyan: '#38bdf8',
          blue: '#818cf8',
          purple: '#c084fc',
          gold: '#fbbf24',
          star: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.5)',
        'glow-purple': '0 0 25px -5px rgba(192, 132, 252, 0.5)',
        'glow-gold': '0 0 25px -5px rgba(251, 191, 36, 0.5)',
      }
    },
  },
  plugins: [],
}
