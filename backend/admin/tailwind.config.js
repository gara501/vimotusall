module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      'theme-base': '#e4ebf7',
      'theme-red': '#f45b63',
      'theme-blue': '#54a6de',
      'theme-green': '#57c059',
      'theme-dark': '#1b2133',
      'theme-blue-light': '#C7D2FE',
      'theme-bg-light': '#F3F4F6'
    },
    extend: {}
  },
  plugins: [require('flowbite/plugin')]
};
