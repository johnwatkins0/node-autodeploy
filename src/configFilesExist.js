import fs from 'fs';

/**
   * Confirms that the config files actually exist.
   * @param  {string} serverConfigPath Path to the server configuration file.
   * @param  {string} deploySettingsPath Path to the deploy settings file.
   * @return {Boolean|Error} True if the files exist.
   */
export const configFilesExist = (
    serverConfigPath,
    deploySettingsPath,
  ) => {
  const response = { ok: true };

  if (fs.existsSync(serverConfigPath) === false) {
    response.ok = false;
    response.message = 'No deploy server settings found in project. ' +
      'Create .deploy-servers.js. ' +
      'More: https://github.com/johnwatkins0/node-autodeploy';
  }

  if (fs.existsSync(deploySettingsPath) === false) {
    response.ok = false;
    response.message = response.message || 'No deploy server settings found in project. ' +
      'Create .deploy-settings.js. ' +
      'More: https://github.com/johnwatkins0/node-autodeploy';
  }

  return response;
};
