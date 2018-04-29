import { exec } from 'child_process';

import { COMMAND_DEFAULTS, makeRsyncArgs } from '.';

const runCommand = (command, commandDefaults) => new Promise((resolve) => {
  exec(command, commandDefaults, (error, stdout) => {
    if (error) {
      resolve(`exec error: ${error}`);
      return;
    }

    resolve(stdout);
  });
});

/**
 * Runs the rsync command.
 * @param  {string} server The server config for this git branch.
 */
export const rsyncToServer = (server, deployConfig, commandDefaults = COMMAND_DEFAULTS) =>
  new Promise(async (resolve) => {
    const args = makeRsyncArgs(deployConfig);

    const serverString = server.username && server.server ?
      `${server.username}@${server.server}:`
      : '';

    const command = `rsync ${args} ${server.port
      ? `-e "ssh -p ${server.port}" `
      : ''}${server.srcPath} ${serverString}${server.destPath}`;

    const commandMessage = await runCommand(command, commandDefaults);
    resolve(`${command}${commandMessage}`);
  });
