import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF1FE',
          100: '#DCE3FD',
          200: '#B9C7FB',
          300: '#96ABF9',
          400: '#738FF7',
          500: '#4F6AF0',
          600: '#3F55C0',
          700: '#2F4090',
          800: '#202B60',
          900: '#101530',
        },
        secondary: {
          50: '#E8EAF0',
          100: '#D1D5E1',
          200: '#A3ABC3',
          300: '#7581A5',
          400: '#475787',
          500: '#1E2A4A',
          600: '#18223B',
          700: '#121A2C',
          800: '#0C111D',
          900: '#06090E',
        },
        success: '#10B981',
        warning: '#FBBF24',
        danger: '#FF6B6B',
        background: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
