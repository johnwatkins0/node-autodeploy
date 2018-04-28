'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGitBranch = undefined;

var _child_process = require('child_process');

var _ = require('.');

global.GIT_BRANCH = null;
global.GIT_GET_BRANCH_COMMAND = 'git rev-parse --abbrev-ref HEAD';

var getGitBranch = exports.getGitBranch = function getGitBranch() {
  return new Promise(function (resolve, reject) {
    if (global.GIT_BRANCH !== null) {
      resolve(global.GIT_BRANCH);
    }

    (0, _child_process.exec)(global.GIT_GET_BRANCH_COMMAND, _.COMMAND_DEFAULTS, function (error, stdout) {
      if (error) {
        reject('ERROR: The current git branch could not be retrieved.');
        return;
      }

      global.GIT_BRANCH = stdout.trim();
      resolve(global.GIT_BRANCH);
    });
  });
};