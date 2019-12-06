module.exports = {
    root: true,
    env: {
      es6: true,
      node: true,
    },
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:json/recommended',
      'plugin:eslint-comments/recommended',
      'plugin:promise/recommended',
      'prettier',
      'prettier/@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['import', '@typescript-eslint', 'prettier', 'promise'],
    rules: {
      /**
       * Allow implicit return types for functions or function interfaces
       * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
       */
      '@typescript-eslint/explicit-function-return-type': 'off',
      /**
       * Enforce import order
       */
      'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
      /**
       * Accessibility specifiers like public/private etc are not mandatory.
       */
      '@typescript-eslint/explicit-member-accessibility': 'off',
      /** Show errors for unused variables */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      /** Show errors for un-resolved imports */
      'import/no-unresolved': 'error',
      /** We need to make this a warning as a lot of the keys from gst-backend are in snake case */
      'camelcase': 'off',
      '@typescript-eslint/camelcase': ['warn'],
      /** https://www.npmjs.com/package/eslint-plugin-promise#rules */
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      /** https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html */
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      'promise/catch-or-return': ['error', { allowFinally: true }],
      /** https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md#options */
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.test.{ts,tsx}', '**/*/test-helpers/*.{ts,tsx}'],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      /** For allowing ++ or -- in forloop */
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    overrides: [
      {
        files: ['**/*.test.{ts,tsx}'],
        rules: {
          'promise/catch-or-return': 'off',
        },
      },
    ],
  };
