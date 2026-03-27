/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004d40',
          dark: '#00352c',
          light: '#005f4f'
        },
        secondary: {
          DEFAULT: '#f57c00',
          dark: '#e65100',
          light: '#ff9800'
        },
        background: '#fafafa',
        surface: '#ffffff',
        text: {
          primary: '#1f2937',
          secondary: '#6b7280',
          muted: '#9ca3af'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
