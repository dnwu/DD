// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevent
    // ion consider switching to `plugin:vue/strongly-recommended` or
    // `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production'
      ? 'error'
      : 'off',
    'comma-dangle': 0,
    'semi': 0,
    'quotes': 0,
    'space-before-function-paren': 0,
    'comma-spacing': 0,
    'no-sequences': 0,
    'indent': 0,
    'no-unexpected-multiline': 0,
    'keyword-spacing': 0,
    'func-call-spacing': 0,
    'prefer-promise-reject-errors': 0
  }
}
