'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     eslint global-require: 0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     import/no-dynamic-require: 0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var execCommandOptions = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 20000 * 1024,
  killSignal: 'SIGTERM',
  cwd: process.env.PWD,
  env: null
};

/**
 * Validate settings and run deployment.
 */

var NodeAutodeployWP = function () {
  /**
   * Declare starting class variables.
   * @param {string} rootPath The path to the project root.
   */
  function NodeAutodeployWP() {
    var rootPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.PWD;

    _classCallCheck(this, NodeAutodeployWP);

    this.serverConfigPath = _path2.default.resolve(rootPath, '.deploy-servers.js');
    this.deploySettingsPath = _path2.default.resolve(rootPath, '.deploy-settings.js');
  }

  /**
   * Validates configuration files.
   * @return {Boolean} True if it's okay to run the deployment.
   */


  _createClass(NodeAutodeployWP, [{
    key: 'isValid',
    value: function isValid() {
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

  }, {
    key: 'configFilesExist',
    value: function configFilesExist() {
      var serverConfigPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.serverConfigPath;
      var deploySettingsPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.deploySettingsPath;

      if (_fs2.default.existsSync(serverConfigPath) === false) {
        throw new Error('No deploy server settings found in project. ' + 'Create .deploy-servers.js. ' + 'More: https://github.com/johnwatkins0/node-autodeploy-wp');
      }

      if (_fs2.default.existsSync(deploySettingsPath) === false) {
        throw new Error('No deploy server settings found in project. ' + 'Create .deploy-settings.js. ' + 'More: https://github.com/johnwatkins0/node-autodeploy-wp');
      }

      return true;
    }

    /**
     * Loads the configuration files.
     * @param  {string} serverConfigPath Path to the server configuration file.
     * @param  {string} deploySettingsPath Path to the deploy settings file.
     */

  }, {
    key: 'bootstrapConfigSettings',
    value: function bootstrapConfigSettings() {
      var serverConfigPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.serverConfigPath;
      var deploySettingsPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.deploySettingsPath;

      this.serverConfig = require(this.serverConfigPath);
      this.deployConfig = require(this.deploySettingsPath);
    }

    /**
     * Confirms the config files have the necessary data.
     * @param  {string} serverConfig Data from the server configuration file.
     * @param  {string} deployConfig Data from the deploy configuration file.
     * @return {Boolean|error} True if they are valid.
     */

  }, {
    key: 'configSettingsAreValid',
    value: function configSettingsAreValid() {
      var serverConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.serverConfig;
      var deployConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.deployConfig;

      if ((typeof serverConfig === 'undefined' ? 'undefined' : _typeof(serverConfig)) !== 'object') {
        throw new Error('.deploy-servers.js is invalid. It must export an object.');
      }

      if ((typeof deployConfig === 'undefined' ? 'undefined' : _typeof(deployConfig)) !== 'object') {
        throw new Error('.deploy-settings.js is invalid. It must export an object.');
      }

      return true;
    }

    /**
     * Assuming configs are valid, runs the script.
     */

  }, {
    key: 'run',
    value: function run() {
      this.maybeDeploy();
    }

    /**
     * Deploys if the current branch is in the config.
     */

  }, {
    key: 'maybeDeploy',
    value: function maybeDeploy() {
      var _this = this;

      (0, _child_process.exec)('git rev-parse --abbrev-ref HEAD', execCommandOptions, function (error, stdout) {
        if (error) {
          throw new Error('exec error: ' + error);
        }

        _this.gitBranch = stdout.trim();

        console.log('The current branch is ' + _this.gitBranch + '.');

        if (_this.gitBranch in _this.serverConfig && _this.serverConfig[_this.gitBranch].active === true) {
          console.log('Deploying to ' + _this.gitBranch + ' ...');

          _this.rsyncToServer();
        } else {
          console.log('Not deploying to ' + _this.gitBranch + '. It\'s not in .deploy-servers.js');
        }
      });
    }

    /**
     * Make a string of default rsync args.
     * @param  {Array}  defaultArgs Default args.
     * @return {String} The string of default args plus any additional ones.
     */

  }, {
    key: 'makeRsyncArgs',
    value: function makeRsyncArgs() {
      var defaultArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['--perms', '--chmod=Du+rwx', '-arv', '--delete', '--copy-links'];

      var args = defaultArgs.map(function (arg) {
        return arg;
      });

      if (this.deployConfig.include) {
        args = args.concat(this.deployConfig.include.map(function (glob) {
          return '--include=' + glob;
        }));
      }

      if (this.deployConfig.exclude) {
        args = args.concat(this.deployConfig.exclude.map(function (glob) {
          return '--exclude=' + glob;
        }));
      }

      return args.join(' ');
    }

    /**
     * Runs the rsync command.
     * @param  {string} serverConfig The server config for this git branch.
     */

  }, {
    key: 'rsyncToServer',
    value: function rsyncToServer() {
      var serverConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.serverConfig[this.gitBranch];

      var args = this.makeRsyncArgs();

      var command = 'rsync ' + args + ' ' + (serverConfig.port ? '-e "ssh -p ' + serverConfig.port + '" ' : '') + serverConfig.srcPath + ' ' + serverConfig.username + '@' + serverConfig.server + ':' + serverConfig.destPath;

      console.log(command);

      (0, _child_process.exec)(command, execCommandOptions, function (error, stdout) {
        if (error) {
          throw new Error('exec error: ' + error);
        }

        console.log('' + stdout);
      });
    }
  }]);

  return NodeAutodeployWP;
}();

exports.default = NodeAutodeployWP;