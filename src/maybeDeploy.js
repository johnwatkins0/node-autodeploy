import { getGitBranch, rsyncToServer } from '.';

/**
   * Deploys if the current branch is in the config.
   */
export const maybeDeploy = (serverConfig, deployConfig) => new Promise(async (resolve) => {
  const gitBranch = await getGitBranch();
  let message = '';

  message += `The current branch is ${gitBranch}.\n`;

  if (gitBranch in serverConfig && serverConfig[gitBranch].active === true) {
    message += `Deploying to ${gitBranch} ...`;

    const rsyncMessage = await rsyncToServer(serverConfig[gitBranch], deployConfig);
    message += rsyncMessage;
  } else {
    message += `Not deploying to ${gitBranch}. It's not in .deploy-servers.js`;
  }

  resolve(message);
});
