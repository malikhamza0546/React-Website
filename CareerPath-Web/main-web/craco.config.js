// craco.config.js
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }
