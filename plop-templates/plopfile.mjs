import packagesGenerator from './packages/prompt.mjs'


export default function (plop) {
  plop.setGenerator('packages', packagesGenerator);
};