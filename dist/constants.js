'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var COMMAND_DEFAULTS = exports.COMMAND_DEFAULTS = {
  encoding: 'utf8',
  maxBuffer: 20000 * 1024,
  killSignal: 'SIGTERM',
  cwd: process.env.PWD,
  env: null,
  timeout: 0
};

var DEFAULT_RSYNC_ARGS = exports.DEFAULT_RSYNC_ARGS = ['--perms', '--chmod=Du+rwx', '-arv', '--delete', '--copy-links'];