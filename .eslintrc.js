module.exports = {
  env: { es6: true, node: true },
  extends: [ 'airbnb-base' ],
  parserOptions: {
    ecmaFeatures: { experimentalObjectRestSpread: true, jsx: true },
    sourceType: 'module'
  },
  rules: { 'no-console': [ 'error', { allow: [ 'log', 'error' ] } ] }
};
