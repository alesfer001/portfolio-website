/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent gradient colors
        'accent': {
          1: 'var(--color-accent-1)',
          2: 'var(--color-accent-2)',
          3: 'var(--color-accent-3)',
        },
        // Background colors
        'surface': {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        // Legacy support
        'primary': 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
      },
      fontFamily: {
        'sans': ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk Variable', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'var(--gradient-primary)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 60px rgba(139, 92, 246, 0.4)',
        'glow-pink': '0 0 40px rgba(236, 72, 153, 0.3)',
      },
    },
  },
  plugins: [],
}
