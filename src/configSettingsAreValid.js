/**
   * Confirms the config files have the necessary data.
   * @param  {string} serverConfig Data from the server configuration file.
   * @param  {string} deployConfig Data from the deploy configuration file.
   * @return {Boolean|error} True if they are valid.
   */

export const configSettingsAreValid = (serverConfig, deployConfig) => typeof serverConfig === 'object' && typeof deployConfig === 'object';
