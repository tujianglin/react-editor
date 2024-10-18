/** @type {import('lint-staged').Config} */
export default {
  "*.{js,jsx,ts,tsx}": [
    "eslint . --fix",
    "prettier --write"
  ],
  "*.{scss,less,styl,css}": [
    "prettier --write",
    "stylelint --fix",
  ],
  "*.md": [
    "prettier --write"
  ]
}