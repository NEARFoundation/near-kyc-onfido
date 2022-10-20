module.exports = {
  extends: ['eslint-config-airbnb-typescript-prettier', 'plugin:@next/next/recommended'], // https://github.com/toshi-toma/eslint-config-airbnb-typescript-prettier https://github.com/airbnb/javascript
  plugins: ['simple-import-sort'],
  rules: {
    // REMEMBER TO RESTART `yarn dev` or `npm run watch` WHENEVER EDITING THESE RULES!
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // ------------------------------
    // Add rules that allow Prettier and ESLint to work together without conflicts (https://stackoverflow.com/a/64166241/):
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'max-len': [
      'warn',
      {
        code: 180,
        tabWidth: 2,
        comments: 180,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    // ------------------------------
    'no-use-before-define': 'off', // We must disable the base rule (since it can report incorrect errors) and replace it (https://stackoverflow.com/a/64024916/)
    '@typescript-eslint/no-use-before-define': ['error'],
    'max-lines-per-function': ['error', { max: 70, skipBlankLines: true, skipComments: true }], // https://eslint.org/docs/rules/max-lines-per-function
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }], // https://eslint.org/docs/rules/max-lines
    'no-console': 'off', // Console logging is super helpful for development, and we can have our build process strip out all of those statements for production.
    'no-else-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    'no-magic-numbers': 'error',
  },
  reportUnusedDisableDirectives: true, // https://eslint.org/docs/user-guide/configuring#report-unused-eslint-disable-comments
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        map: [['@', '.']],
      },
    },
  },
  overrides: [
    {
      files: ['./**/*.js', './**/*.jsx', './**/*.ts', './**/*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
  },
};
