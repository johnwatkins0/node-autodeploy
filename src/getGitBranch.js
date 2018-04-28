import { exec } from 'child_process';

import { COMMAND_DEFAULTS } from '.';

global.GIT_BRANCH = null;
global.GIT_GET_BRANCH_COMMAND = 'git rev-parse --abbrev-ref HEAD';

export const getGitBranch = () => new Promise((resolve, reject) => {
  if (global.GIT_BRANCH !== null) {
    resolve(global.GIT_BRANCH);
  }

  exec(
    global.GIT_GET_BRANCH_COMMAND,
    COMMAND_DEFAULTS,
    (error, stdout) => {
      if (error) {
        reject('ERROR: The current git branch could not be retrieved.');
        return;
      }

      global.GIT_BRANCH = stdout.trim();
      resolve(global.GIT_BRANCH);
    });
});
