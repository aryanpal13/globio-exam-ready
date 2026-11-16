/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        globio: {
          primary: '#18268e',
          'primary-hover': '#131e72',
          'primary-light': '#eef2ff',
          accent: '#fbbf24',
          'accent-hover': '#f59e0b',
          'accent-light': '#fef3c7',
          dark: '#0f172a',
          slate: '#334155',
          muted: '#64748b',
          border: '#e2e8f0',
          bg: '#f8fafc',
          card: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'globio': '0 4px 20px -2px rgba(24, 38, 142, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'globio-hover': '0 10px 25px -3px rgba(24, 38, 142, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
