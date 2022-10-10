module.exports = {
  trailingComma: 'all',
  endOfLine: 'auto',
  printWidth: 180,
  bracketSpacing: true,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  overrides: [
    {
      files: 'Routes.js',
      options: {
        printWidth: 200,
      },
    },
  ],
};
