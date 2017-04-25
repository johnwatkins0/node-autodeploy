'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _child_process = require('child_process');

var servers = require(process.env.PWD + '/.deploy-servers.js'); /* eslint import/no-dynamic-require: 0*/

var settings = require(process.env.PWD + '/.deploy-settings.js');

var commandOptions = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: process.env.PWD,
  env: null
};

function rsyncToServer(server) {
  var args = ['--perms', '--chmod=Du+rwx', '-arv'];
  if (settings.exclude) {
    args = args.concat(settings.ignore.map(function (excludeGlob) {
      return '--exclude=' + excludeGlob;
    }));
  }

  var command = 'rsync ' + args.join(' ') + ' ' + server.srcPath + ' ' + (server.username + '@' + server.server + ':' + server.destPath);

  (0, _child_process.exec)(command, commandOptions, function (error, stdout) {
    if (error) {
      console.error('exec error: ' + error);
      return;
    }

    console.log('' + stdout);
  });
}

function maybeDeploy() {
  var branchCommand = 'git rev-parse --abbrev-ref HEAD';

  (0, _child_process.exec)(branchCommand, commandOptions, function (error, stdout) {
    if (error) {
      throw new Error('exec error: ' + error);
    }

    var branch = stdout.trim();

    console.log('The current branch is ' + branch + '.');

    if (branch in servers && servers[branch].active === true) {
      console.log('Deploying to ' + branch + ' ...');
      rsyncToServer(servers[branch], settings);
    } else {
      console.log('Not deploying to ' + branch + '.');
    }
  });
}

function run() {
  maybeDeploy();
}