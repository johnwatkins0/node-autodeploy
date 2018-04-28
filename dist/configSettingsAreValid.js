'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
   * Confirms the config files have the necessary data.
   * @param  {string} serverConfig Data from the server configuration file.
   * @param  {string} deployConfig Data from the deploy configuration file.
   * @return {Boolean|error} True if they are valid.
   */

var configSettingsAreValid = exports.configSettingsAreValid = function configSettingsAreValid(serverConfig, deployConfig) {
   return (typeof serverConfig === 'undefined' ? 'undefined' : _typeof(serverConfig)) === 'object' && (typeof deployConfig === 'undefined' ? 'undefined' : _typeof(deployConfig)) === 'object';
};