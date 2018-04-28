'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maybeDeploy = undefined;

var _ = require('.');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
   * Deploys if the current branch is in the config.
   */
var maybeDeploy = exports.maybeDeploy = function maybeDeploy(serverConfig, deployConfig) {
  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var gitBranch, message, rsyncMessage;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _.getGitBranch)();

            case 2:
              gitBranch = _context.sent;
              message = '';


              message += 'The current branch is ' + gitBranch + '.\n';

              if (!(gitBranch in serverConfig && serverConfig[gitBranch].active === true)) {
                _context.next = 13;
                break;
              }

              message += 'Deploying to ' + gitBranch + ' ...';

              _context.next = 9;
              return (0, _.rsyncToServer)(serverConfig[gitBranch], deployConfig);

            case 9:
              rsyncMessage = _context.sent;

              message += rsyncMessage;
              _context.next = 14;
              break;

            case 13:
              message += 'Not deploying to ' + gitBranch + '. It\'s not in .deploy-servers.js';

            case 14:

              resolve(message);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};