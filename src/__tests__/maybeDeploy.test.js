import path from 'path';

import { maybeDeploy, COMMAND_DEFAULTS } from '..';

const { deployConfig, serverConfig } = global;

describe('maybeDeploy function', () => {
  it('handles switched off deployment', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'HEAD';
    const message = await maybeDeploy(serverConfig, deployConfig);

    expect(message).toBe("The current branch is HEAD.\nNot deploying to HEAD. It's not in .deploy-servers.js");
    global.GIT_BRANCH = branch;
  });

  it('handles deployment but times out', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'HEAD';
    COMMAND_DEFAULTS.timeout = 2000;
    const serverConfig2 = { ...serverConfig };
    serverConfig2.HEAD.active = true;
    const message = await maybeDeploy(serverConfig2, deployConfig);
    global.GIT_BRANCH = branch;

    expect(message).toMatch(/The current branch is HEAD/);
  });

  it('works with a port number', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'HEAD';
    COMMAND_DEFAULTS.timeout = 2000;
    const serverConfig2 = { ...serverConfig };
    serverConfig2.HEAD.active = true;
    serverConfig2.HEAD.port = 20;
    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/The current branch is HEAD./);
    global.GIT_BRANCH = branch;
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
