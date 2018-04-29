'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rsyncToServer = undefined;

var _child_process = require('child_process');

var _ = require('.');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var runCommand = function runCommand(command, commandDefaults) {
  return new Promise(function (resolve) {
    (0, _child_process.exec)(command, commandDefaults, function (error, stdout) {
      if (error) {
        resolve('exec error: ' + error);
        return;
      }

      resolve(stdout);
    });
  });
};

/**
 * Runs the rsync command.
 * @param  {string} server The server config for this git branch.
 */
var rsyncToServer = exports.rsyncToServer = function rsyncToServer(server, deployConfig) {
  var commandDefaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _.COMMAND_DEFAULTS;
  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var args, serverString, command, commandMessage;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = (0, _.makeRsyncArgs)(deployConfig);
              serverString = server.username && server.server ? server.username + '@' + server.server + ':' : '';
              command = 'rsync ' + args + ' ' + (server.port ? '-e "ssh -p ' + server.port + '" ' : '') + server.srcPath + ' ' + serverString + server.destPath;
              _context.next = 5;
              return runCommand(command, commandDefaults);

            case 5:
              commandMessage = _context.sent;

              resolve('' + command + commandMessage);

            case 7:
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