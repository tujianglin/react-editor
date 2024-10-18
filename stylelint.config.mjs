/** @type {import('stylelint').Config} */
export default {
  root: true,
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-recommended-less'],
  overrides: [
    {
      files: ['**/*.{css,less}'],
      customSyntax: 'postcss-less',
    },
  ],
  ignoreFiles: ['**/iconfont/**/*'],
  plugins: ['@stylistic/stylelint-plugin', 'stylelint-prettier', 'stylelint-order'],
  rules: {
    'prettier/prettier': true,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
  },
};
