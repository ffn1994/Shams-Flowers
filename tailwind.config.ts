import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fdf3f5',
          100: '#fbe7ec',
          200: '#f6c9d5',
          300: '#eea3b8',
          400: '#e27494',
          500: '#d34d76',
          600: '#bb3360',
          700: '#9c2550',
          800: '#822146',
          900: '#6f1f3e',
        },
        leaf: {
          50: '#f2f7f3',
          100: '#e0ece2',
          300: '#a9c8b1',
          500: '#5f8f6c',
          700: '#3d6349',
          900: '#26402f',
        },
        sand: {
          50: '#fbf8f4',
          100: '#f4ede4',
          200: '#e7dbcb',
          300: '#d6c3ab',
        },
      },
      fontFamily: {
        sans: ['var(--font-app)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(111, 31, 62, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
