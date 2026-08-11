/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Board housing
        void: 'var(--void)',
        housing: 'var(--housing)',
        flap: 'var(--flap)',

        // The one accent
        amber: {
          DEFAULT: 'var(--amber)',
          deep: 'var(--amber-deep)',
        },

        // Type
        bone: 'var(--bone)',
        ash: {
          DEFAULT: 'var(--ash)',
          dim: 'var(--ash-dim)',
        },

        // Status — separate from the accent
        'on-time': 'var(--on-time)',

        // Legacy aliases for components not rewritten
        accent: {
          1: 'var(--amber)',
          2: 'var(--amber)',
          3: 'var(--bone)',
        },
        surface: {
          primary: 'var(--void)',
          secondary: 'var(--housing)',
          tertiary: 'var(--flap)',
        },
        primary: 'var(--amber)',
        'primary-hover': 'var(--amber-deep)',
      },
      borderColor: {
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
      },
      fontFamily: {
        sans: ['Instrument Sans Variable', 'system-ui', 'sans-serif'],
        display: ['Archivo Variable', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        label: '0.2em',
      },
      transitionTimingFunction: {
        board: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
