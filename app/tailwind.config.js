/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'background-color': 'background-color'
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@headlessui/tailwindcss')
  ],
}
