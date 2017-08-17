const path = require('path');

module.exports = {
  plugins: {
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
