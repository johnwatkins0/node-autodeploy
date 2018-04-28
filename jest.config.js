const serverConfig = require('./src/__tests__/valid-directory/.deploy-servers');
const deployConfig = require('./src/__tests__/valid-directory/.deploy-settings');

module.exports = {
  testMatch: ['**/?(*.)(spec|test).js?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['src/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', 'index.js'],
  globals: {
    deployConfig,
    serverConfig,
  },
};
