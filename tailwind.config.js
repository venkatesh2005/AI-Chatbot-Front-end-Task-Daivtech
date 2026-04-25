/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalScale: {
          '0%':   { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typingBounce: {
          '0%, 60%, 100%': { transform: 'translateY(0)',    opacity: '0.35' },
          '30%':            { transform: 'translateY(-5px)', opacity: '1'    },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        'fade-up':      'fadeUp 200ms ease',
        'modal-scale':  'modalScale 200ms ease',
        'slide-down':   'slideDown 150ms ease',
        'typing-1':     'typingBounce 1.2s ease infinite',
        'typing-2':     'typingBounce 1.2s ease 200ms infinite',
        'typing-3':     'typingBounce 1.2s ease 400ms infinite',
        'cursor-blink': 'cursorBlink 0.8s ease infinite',
      },
    },
  },
  plugins: [],
}
