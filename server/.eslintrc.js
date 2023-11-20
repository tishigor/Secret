module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    // parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': 0,
    'import/no-cycle': 'off',
    'no-console': ['error', { allow: ['error'] }],
    'no-bitwise': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-reserved-component-names': 'warn',
    'no-param-reassign': ['error'],
    'vue/no-unused-properties': [
      'error',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
      },
    ],
  },
};
