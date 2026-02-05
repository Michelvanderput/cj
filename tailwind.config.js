/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Veneer Clean"', 'serif'],
        body: ['Ubuntu', 'system-ui', 'sans-serif'],
        sans: ['Ubuntu', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          main: '#FFD6AC',
          'main-hover': '#FFCB94',
          'main-active': '#FFC07C',
          secondary: '#EC494A',
          'secondary-hover': '#D93D3E',
          'secondary-active': '#C63233',
        },
        surface: {
          bg: '#121314',
          DEFAULT: '#1A1B1D',
          elevated: '#222426',
          card: '#1E2022',
        },
        tx: {
          primary: '#FFD6AC',
          secondary: '#C4A882',
          muted: '#7A7068',
          inverse: '#121314',
        },
        brd: {
          DEFAULT: '#2E3034',
          hover: '#44474C',
          active: '#FFD6AC',
        },
        state: {
          success: '#4ADE80',
          'success-muted': '#166534',
          warn: '#FBBF24',
          'warn-muted': '#854D0E',
          error: '#F87171',
          'error-muted': '#991B1B',
        },
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h3': ['1.75rem', { lineHeight: '1.25' }],
        'h4': ['1.25rem', { lineHeight: '1.35' }],
        'h5': ['1rem', { lineHeight: '1.4' }],
        'h6': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.25)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow-main': '0 0 20px rgba(255, 214, 172, 0.15)',
        'glow-secondary': '0 0 20px rgba(236, 73, 74, 0.2)',
      },
      transitionDuration: {
        '175': '175ms',
        '225': '225ms',
      },
      maxWidth: {
        'container': '80rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
