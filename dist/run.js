'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           eslint global-require: 0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           import/no-dynamic-require: 0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */


/**
 * Runs the process.
 *
 * @param {string} rootPath The root project folder.
 */
var run = exports.run = function run() {
  var rootPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.PWD;
  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var _global, serverConfig, deployConfig, serverConfigPath, deployConfigPath, configFilesExistResponse, message;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _global = global, serverConfig = _global.serverConfig, deployConfig = _global.deployConfig;

              if (serverConfig && deployConfig) {
                _context.next = 13;
                break;
              }

              serverConfigPath = _path2.default.resolve(rootPath, '.deploy-servers.js');
              deployConfigPath = _path2.default.resolve(rootPath, '.deploy-settings.js');
              configFilesExistResponse = (0, _.configFilesExist)(serverConfigPath, deployConfigPath);

              if (!(configFilesExistResponse.ok === false)) {
                _context.next = 8;
                break;
              }

              resolve(configFilesExistResponse.message);
              return _context.abrupt('return');

            case 8:

              serverConfig = require(serverConfigPath);
              deployConfig = require(deployConfigPath);

              if (!((0, _.configSettingsAreValid)(serverConfig, deployConfig) !== true)) {
                _context.next = 13;
                break;
              }

              resolve('node-autodeploy: A config object is invalid.');
              return _context.abrupt('return');

            case 13:
              _context.next = 15;
              return (0, _.maybeDeploy)(serverConfig, deployConfig);

            case 15:
              message = _context.sent;

              resolve(message);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
};