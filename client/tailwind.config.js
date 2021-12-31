module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    screens: {
      // 'md': {'max': '768px'}
    },
    extend: {
      colors: {
        gray: {
          github: '#333'
        }
      }
    },
  },
  plugins: [],
}
