module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
        'gradient-border': 'linear-gradient(45deg, #6EE7B7, #3B82F6)',
      },
      scale: {
        125: '1.25',
        150: '1.5',
      },
      zIndex: {
        '-1': '-1',
        10: '10',
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover', 'focus'],
      zIndex: ['hover', 'focus'],
    },
  },
  plugins: [],
}