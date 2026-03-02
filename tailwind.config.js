/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50:  '#fdf8ef',
          100: '#faefd6',
          200: '#f3d9a0',
          300: '#ebbf63',
          400: '#e4a832',
          500: '#d48f1a',
          600: '#b87214',
          700: '#8f5413',
          800: '#6b3d15',
          900: '#4a2a0e',
        },
        stone: {
          50:  '#f6f4f0',
          100: '#e8e3d9',
          200: '#d2c9b6',
          300: '#b8aa90',
          400: '#9e8d6f',
          500: '#857458',
          600: '#6b5c44',
          700: '#4a3e2e',
          800: '#2e2519',
          900: '#1a1209',
        },
        egypt: {
          gold:   '#c9a227',
          amber:  '#e67c1b',
          red:    '#a83219',
          blue:   '#2a6496',
          green:  '#2e7d32',
          dark:   '#1c1208',
          darker: '#110b04',
        },
      },
      fontFamily: {
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        body:  ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'hieroglyph': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-opacity='0.07' stroke='%23c9a227' stroke-width='0.5'%3E%3Crect x='5' y='5' width='10' height='15'/%3E%3Cpath d='M10 20 L10 28 M7 24 L13 24'/%3E%3Ccircle cx='40' cy='12' r='6'/%3E%3Cpath d='M35 25 L45 25 M40 20 L40 30'/%3E%3Ctriangle points='10,45 20,35 30,45'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'torch-flicker': 'torchFlicker 2s ease-in-out infinite alternate',
        'glow-pulse':    'glowPulse 1.8s ease-in-out infinite',
        'chain-appear':  'chainAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'shake':         'shake 0.4s ease-in-out',
        'float':         'float 3s ease-in-out infinite',
      },
      keyframes: {
        torchFlicker: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '33%':       { opacity: '0.85', filter: 'brightness(0.9)' },
          '66%':       { opacity: '0.95', filter: 'brightness(1.1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(201,162,39,0.6)' },
          '50%':       { boxShadow: '0 0 20px 6px rgba(201,162,39,0.9)' },
        },
        chainAppear: {
          '0%':   { opacity: '0', transform: 'scale(0.5) rotate(-10deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-6px)' },
          '40%':      { transform: 'translateX(6px)' },
          '60%':      { transform: 'translateX(-4px)' },
          '80%':      { transform: 'translateX(4px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
