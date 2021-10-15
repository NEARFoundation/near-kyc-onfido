module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true, // just use this on ecmaFeatures, no need "experimentalObjectRestSpread" anymore.
    },
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:@typescript-eslint/eslint-recommended', //  Uses the recommended rules from the @typescript-eslint/eslint-plugin https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/#Installation-and-setup
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier. https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'prettier', // Add "prettier" last. This will turn off eslint rules conflicting with prettier. This is not what will format our code.
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true, // { "env": { "es6": true } } enables ES6 syntax automatically, but { "parserOptions": { "ecmaVersion": 6 } } does not enable ES6 globals automatically. https://eslint.org/docs/user-guide/configuring#specifying-parser-options
    jest: true,
    node: true,
  },
  plugins: ['prettier', 'jam3', 'react-hooks', '@typescript-eslint'],
  /* settings: {
        'import/resolver': {
            // node: {
            //     extensions: ['.js', '.jsx', '.ts', '.tsx'], // https://stackoverflow.com/a/55280867/
            // },
            typescript: {}, // https://stackoverflow.com/a/63451047/
        },
        // 'import/extensions': 0, // Turn off "Missing file extension for ..." error. https://stackoverflow.com/a/56192351/
    }, */
  rules: {
    // REMEMBER TO RESTART `npm run watch` WHENEVER EDITING THESE RULES!
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
    // We must disable the base rule (since it can report incorrect errors) and replace it (https://stackoverflow.com/a/64024916/):
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // ------------------------------
    // Add extra rules:
    'max-lines-per-function': ['error', { max: 30, skipBlankLines: true, skipComments: true }], // https://eslint.org/docs/rules/max-lines-per-function
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }], // https://eslint.org/docs/rules/max-lines
    // Disable rules from base configurations:
    'no-console': 'off', // Console logging is super helpful for development, and we can have our build process strip out all of those statements for production.
    'func-names': 'off', // https://eslint.org/docs/rules/func-names#as-needed
    'no-else-return': 'off',
    // 'react/forbid-prop-types': 'off', // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
    // 'import/prefer-default-export': 'off',
    // 'jsx-a11y/media-has-caption': 'off',
    // 'react/no-danger': 'off', // This is only disabled because 'jam3/no-sanitizer-with-danger' is enabled below.
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks https://reactjs.org/docs/hooks-rules.html
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback', // https://recoiljs.org/docs/introduction/installation#eslint
      },
    ], // Checks effect dependencies https://reactjs.org/docs/hooks-rules.html
    // ------------------------------
    // This secction seems necessary for RedwoodJs:
    // 'react/react-in-jsx-scope': 'off',
    // 'import/no-extraneous-dependencies': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/extensions': 'off',
    // ------------------------------
    // 'jam3/no-sanitizer-with-danger': [
    //     // https://stackoverflow.com/a/57800949/ and https://dev.to/jam3/how-to-prevent-xss-attacks-when-using-dangerouslysetinnerhtml-in-react-1464 and https://github.com/Jam3/eslint-plugin-jam3/blob/master/docs/rules/no-sanitizer-with-danger.md
    //     2,
    //     {
    //         wrapperName: ['jam3domSanitize'],
    //     },
    // ],
  },
  reportUnusedDisableDirectives: true, // https://eslint.org/docs/user-guide/configuring#report-unused-eslint-disable-comments
};
