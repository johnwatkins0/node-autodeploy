'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGitBranch = undefined;

var _gitBranch = require('git-branch');

var _gitBranch2 = _interopRequireDefault(_gitBranch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getGitBranch = exports.getGitBranch = function getGitBranch() {
  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var branchName;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (global.GIT_BRANCH !== null) {
                resolve(global.GIT_BRANCH);
              }

              _context.next = 3;
              return (0, _gitBranch2.default)();

            case 3:
              branchName = _context.sent;

              resolve(branchName);

            case 5:
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