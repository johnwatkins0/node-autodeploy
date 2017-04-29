'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _nodeAutodeployWp = require('./node-autodeploy-wp');

var _nodeAutodeployWp2 = _interopRequireDefault(_nodeAutodeployWp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entry point.
 */
function run() {
  var nodeAutodeploy = new _nodeAutodeployWp2.default();

  if (nodeAutodeploy.isValid()) {
    nodeAutodeploy.run();
  }
}