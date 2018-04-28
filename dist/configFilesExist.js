'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFilesExist = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * Confirms that the config files actually exist.
   * @param  {string} serverConfigPath Path to the server configuration file.
   * @param  {string} deploySettingsPath Path to the deploy settings file.
   * @return {Boolean|Error} True if the files exist.
   */
var configFilesExist = exports.configFilesExist = function configFilesExist(serverConfigPath, deploySettingsPath) {
  var response = { ok: true };

  if (_fs2.default.existsSync(serverConfigPath) === false) {
    response.ok = false;
    response.message = 'No deploy server settings found in project. ' + 'Create .deploy-servers.js. ' + 'More: https://github.com/johnwatkins0/node-autodeploy';
  }

  if (_fs2.default.existsSync(deploySettingsPath) === false) {
    response.ok = false;
    response.message = response.message || 'No deploy server settings found in project. ' + 'Create .deploy-settings.js. ' + 'More: https://github.com/johnwatkins0/node-autodeploy';
  }

  return response;
};