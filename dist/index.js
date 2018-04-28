'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _nodeAutodeploy = require('./node-autodeploy');

var _nodeAutodeploy2 = _interopRequireDefault(_nodeAutodeploy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entry point.
 */
function run() {
  var nodeAutodeploy = new _nodeAutodeploy2.default();

  if (nodeAutodeploy.isValid()) {
    nodeAutodeploy.run();
  }
}