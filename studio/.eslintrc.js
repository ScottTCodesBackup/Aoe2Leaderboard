const path = require('path')

module.exports = {
  extends: ['standard', 'airbnb'],
  parser: 'babel-eslint',
  rules: {
    "no-underscore-dangle": 0
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.2.0'
    }
  }
}
