module.exports = {
  env: {
    browser: true,
  },
  extends: ['@open-wc/eslint-config', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['federated-types/*.d.ts'],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['strictCamelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'memberLike',
        modifiers: ['protected'],
        format: ['strictCamelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'class-methods-use-this': 'off',
    'guard-for-in': 'off',
    'import/extensions': 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': 'off',
    'lines-between-class-members': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'prefer-destructuring': 'off',
    'wc/guard-super-call': 'off',
  },
};
