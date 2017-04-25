module.exports = {
  env: { es6: true },
  extends: [ 'eslint:recommended', 'airbnb' ],
  globals: { process: true, console: true, require: true },
  parserOptions: {
    ecmaFeatures: { experimentalObjectRestSpread: true, jsx: true },
    sourceType: 'module'
  },
  rules: { 'no-console': [ 'error', { allow: [ 'log', 'error' ] } ] }
};
