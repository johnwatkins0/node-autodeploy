import path from 'path';

import { maybeDeploy, COMMAND_DEFAULTS } from '..';

const { deployConfig, serverConfig } = global;

describe('maybeDeploy function', () => {
  it('handles switched off deployment', async () => {
    const message = await maybeDeploy(serverConfig, deployConfig);

    expect(message).toBe("The current branch is master.\nNot deploying to master. It's not in .deploy-servers.js");
  });

  it('handles deployment but times out', async () => {
    COMMAND_DEFAULTS.timeout = 2000;
    const serverConfig2 = { ...serverConfig };
    serverConfig2.HEAD.active = true;
    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/The current branch is master./);
  });

  it('works with a port number', async () => {
    COMMAND_DEFAULTS.timeout = 2000;
    const serverConfig2 = { ...serverConfig };
    serverConfig2.HEAD.active = true;
    serverConfig2.HEAD.port = 20;
    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/The current branch is master./);
  });

  it('handles deployment successfully', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'HEAD';
    const serverConfig2 = { ...serverConfig };
    serverConfig2.HEAD.active = true;
    serverConfig2.HEAD.server = '';
    serverConfig2.HEAD.destPath = path.resolve(__dirname, './rsync-target-dir');
    serverConfig2.HEAD.username = '';
    delete serverConfig2.HEAD.port;

    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/total size is/);
    global.GIT_BRANCH = branch;
  });
});
