'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRsyncArgs = undefined;

var _ = require('.');

/**
   * Make a string of default rsync args.
   * @param  {Array}  defaultArgs Default args.
   * @return {String} The string of default args plus any additional ones.
   */
var makeRsyncArgs = exports.makeRsyncArgs = function makeRsyncArgs(deployConfig) {
  var args = _.DEFAULT_RSYNC_ARGS.map(function (arg) {
    return arg;
  });

  if (deployConfig.include) {
    args = args.concat(deployConfig.include.map(function (glob) {
      return '--include=' + glob;
    }));
  }

  if (deployConfig.exclude) {
    args = args.concat(deployConfig.exclude.map(function (glob) {
      return '--exclude=' + glob;
    }));
  }

  return args.join(' ');
};