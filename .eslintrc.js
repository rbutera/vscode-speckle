/* eslint-disable */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'functional'],
  extends: [
    'plugin:you-dont-need-lodash-underscore/compatible',
    'plugin:jest/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'xo-typescript/space',
    'prettier',
    'prettier/unicorn',
    'prettier/@typescript-eslint',
    'plugin:functional/external-recommended',
    'plugin:functional/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'functional/no-expression-statement': 'off',
    'functional/no-class': 'off',
    'functional/functional-parameters': 'off',
    'functional/no-conditional-statement': 'off',
    'functional/no-let': 'warn',
    'functional/no-loop-statement': 'warn',
    'functional/no-this-expression': 'off',
    'functional/no-throw-statement': 'off',
    'functional/no-try-statement': 'off',
    'functional/no-return-void': 'warn',
    'unicorn/no-array-callback-reference': 'warn',
  },
  overrides: [
    {
      files: 'test/**/*.integration.ts',
      rules: {
        'jest/expect-expect': 'off',
      },
    },
    {
      files: 'src/**/*.spec.ts',
      rules: {
        '@typescript-eslint/ban-ts-comment': 'warn',
        'functional/immutable-data': 'off',
        'functional/prefer-readonly-type': 'off',
        'functional/no-loop-statement': 'off',
      },
    },
  ],
}
