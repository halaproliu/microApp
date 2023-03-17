module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-unused-components': 'off',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    indent: ['error', 2]
  },
  globals: {
    __webpack_init_sharing__: true,
    __webpack_share_scopes__: true
  }
};
