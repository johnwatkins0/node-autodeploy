/*
eslint global-require: 0
import/no-dynamic-require: 0
*/
import path from 'path';

import { configFilesExist, maybeDeploy, configSettingsAreValid } from '.';

/**
 * Runs the process.
 *
 * @param {string} rootPath The root project folder.
 */
export const run = (rootPath = process.env.PWD) => new Promise(async (resolve) => {
  let { serverConfig, deployConfig } = global;

  if (!(serverConfig && deployConfig)) {
    const serverConfigPath = path.resolve(rootPath, '.deploy-servers.js');
    const deployConfigPath = path.resolve(rootPath, '.deploy-settings.js');

    const configFilesExistResponse = configFilesExist(serverConfigPath, deployConfigPath);
    if (configFilesExistResponse.ok === false) {
      resolve(configFilesExistResponse.message);
      return;
    }

    serverConfig = require(serverConfigPath);
    deployConfig = require(deployConfigPath);

    if (configSettingsAreValid(serverConfig, deployConfig) !== true) {
      resolve('node-autodeploy: A config object is invalid.');
      return;
    }
  }

  const message = await maybeDeploy(serverConfig, deployConfig);
  resolve(message);
});
