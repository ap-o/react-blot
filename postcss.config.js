const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      root: path.join(__dirname, 'src'),
      path: []
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-apply': {},
    'postcss-nesting': {},
    'postcss-cssnext': {
      browsers: ['> 1%']
    },
    'postcss-color-function': {},
    'postcss-reporter': {
      clearMessages: true
    }
  }
}
