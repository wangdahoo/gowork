module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: 'standard',
  globals: {
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'semi': 'error',
    'camelcase': 'off',
    'no-template-curly-in-string': 'off'
  }
}
