/* eslint import/no-dynamic-require: 0*/

import { exec } from 'child_process';

const servers = require(`${process.env.PWD}/.deploy-servers.js`);
const settings = require(`${process.env.PWD}/.deploy-settings.js`);

const commandOptions = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: process.env.PWD,
  env: null,
};

function rsyncToServer(server) {
  let args = ['--perms', '--chmod=Du+rwx', '-arv'];
  if (settings.exclude) {
    args = args.concat(
      settings.ignore.map(excludeGlob => `--exclude=${excludeGlob}`),
    );
  }

  const command = `rsync ${args.join(' ')} ${server.srcPath} ` +
    `${server.username}@${server.server}:${server.destPath}`;

  exec(command, commandOptions, (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`${stdout}`);
  });
}

function maybeDeploy() {
  const branchCommand = 'git rev-parse --abbrev-ref HEAD';

  exec(branchCommand, commandOptions, (error, stdout) => {
    if (error) {
      throw new Error(`exec error: ${error}`);
    }

    const branch = stdout.trim();

    console.log(`The current branch is ${branch}.`);

    if (branch in servers && servers[branch].active === true) {
      console.log(`Deploying to ${branch} ...`);
      rsyncToServer(servers[branch], settings);
    } else {
      console.log(`Not deploying to ${branch}.`);
    }
  });
}

export default function run() {
  maybeDeploy();
}
