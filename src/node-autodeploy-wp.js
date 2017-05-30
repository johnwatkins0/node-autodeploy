/*
eslint global-require: 0
import/no-dynamic-require: 0
*/

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const execCommandOptions = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: process.env.PWD,
  env: null,
};

/**
 * Validate settings and run deployment.
 */
export default class NodeAutodeployWP {
  /**
   * Declare starting class variables.
   * @param {string} rootPath The path to the project root.
   */
  constructor(rootPath = process.env.PWD) {
    this.serverConfigPath = path.resolve(rootPath, '.deploy-servers.js');
    this.deploySettingsPath = path.resolve(rootPath, '.deploy-settings.js');
  }

  /**
   * Validates configuration files.
   * @return {Boolean} True if it's okay to run the deployment.
   */
  isValid() {
    if (this.configFilesExist() !== true) {
      return false;
    }

    this.bootstrapConfigSettings();

    if (this.configSettingsAreValid() !== true) {
      return false;
    }

    return true;
  }

  /**
   * Confirms that the config files actually exist.
   * @param  {string} serverConfigPath Path to the server configuration file.
   * @param  {string} deploySettingsPath Path to the deploy settings file.
   * @return {Boolean|Error} True if the files exist.
   */
  configFilesExist(
    serverConfigPath = this.serverConfigPath,
    deploySettingsPath = this.deploySettingsPath
  ) {
    if (fs.existsSync(serverConfigPath) === false) {
      throw new Error(
        'No deploy server settings found in project. ' +
          'Create .deploy-servers.js. ' +
          'More: https://github.com/johnwatkins0/node-autodeploy-wp'
      );
    }

    if (fs.existsSync(deploySettingsPath) === false) {
      throw new Error(
        'No deploy server settings found in project. ' +
          'Create .deploy-settings.js. ' +
          'More: https://github.com/johnwatkins0/node-autodeploy-wp'
      );
    }

    return true;
  }

  /**
   * Loads the configuration files.
   * @param  {string} serverConfigPath Path to the server configuration file.
   * @param  {string} deploySettingsPath Path to the deploy settings file.
   */
  bootstrapConfigSettings(
    serverConfigPath = this.serverConfigPath,
    deploySettingsPath = this.deploySettingsPath
  ) {
    this.serverConfig = require(this.serverConfigPath);
    this.deployConfig = require(this.deploySettingsPath);
  }

  /**
   * Confirms the config files have the necessary data.
   * @param  {string} serverConfig Data from the server configuration file.
   * @param  {string} deployConfig Data from the deploy configuration file.
   * @return {Boolean|error} True if they are valid.
   */
  configSettingsAreValid(
    serverConfig = this.serverConfig,
    deployConfig = this.deployConfig
  ) {
    if (typeof serverConfig !== 'object') {
      throw new Error(
        '.deploy-servers.js is invalid. It must export an object.'
      );
    }

    if (typeof deployConfig !== 'object') {
      throw new Error(
        '.deploy-settings.js is invalid. It must export an object.'
      );
    }

    return true;
  }

  /**
   * Assuming configs are valid, runs the script.
   */
  run() {
    this.maybeDeploy();
  }

  /**
   * Deploys if the current branch is in the config.
   */
  maybeDeploy() {
    exec(
      'git rev-parse --abbrev-ref HEAD',
      execCommandOptions,
      (error, stdout) => {
        if (error) {
          throw new Error(`exec error: ${error}`);
        }

        this.gitBranch = stdout.trim();

        console.log(`The current branch is ${this.gitBranch}.`);

        if (
          this.gitBranch in this.serverConfig &&
          this.serverConfig[this.gitBranch].active === true
        ) {
          console.log(`Deploying to ${this.gitBranch} ...`);

          this.rsyncToServer();
        } else {
          console.log(
            `Not deploying to ${this.gitBranch}. It's not in .deploy-servers.js`
          );
        }
      }
    );
  }

  /**
   * Make a string of default rsync args.
   * @param  {Array}  args Default args.
   * @return {String} The string of default args plus any additional ones.
   */
  makeRsyncArgs(
    args = ['--perms', '--chmod=Du+rwx', '-arv', '--delete', '--copy-links']
  ) {
    if (this.deployConfig.exclude) {
      return args
        .concat(this.deployConfig.exclude.map((glob) => `--exclude=${glob}`))
        .join(' ');
    }

    return args.join(' ');
  }

  /**
   * Runs the rsync command.
   * @param  {string} serverConfig The server config for this git branch.
   */
  rsyncToServer(serverConfig = this.serverConfig[this.gitBranch]) {
    const args = this.makeRsyncArgs();

    const command =
      `rsync ${args} ${serverConfig.srcPath} ` +
      `${serverConfig.username}` +
      `@${serverConfig.server}:${serverConfig.destPath}`;

    console.log(command);

    exec(command, execCommandOptions, (error, stdout) => {
      if (error) {
        throw new Error(`exec error: ${error}`);
      }

      console.log(`${stdout}`);
    });
  }
}
