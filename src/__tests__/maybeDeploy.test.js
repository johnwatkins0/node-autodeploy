import path from 'path';

import { maybeDeploy, COMMAND_DEFAULTS } from '..';

const { deployConfig, serverConfig } = global;

describe('maybeDeploy function', () => {
  it('handles switched off deployment', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'master';
    const message = await maybeDeploy(serverConfig, deployConfig);

    expect(message).toBe("The current branch is master.\nNot deploying to master. It's not in .deploy-servers.js");
    global.GIT_BRANCH = branch;
  });

  it('handles deployment but times out', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'master';
    COMMAND_DEFAULTS.timeout = 2000;
    const serverConfig2 = { ...serverConfig };
    serverConfig2.master.active = true;
    const message = await maybeDeploy(serverConfig2, deployConfig);
    global.GIT_BRANCH = branch;

    expect(message).toMatch(/The current branch is master/);
  });

  it('works with a port number', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'master';
    COMMAND_DEFAULTS.timeout = 2000;
    const serverConfig2 = { ...serverConfig };
    serverConfig2.master.active = true;
    serverConfig2.master.port = 20;
    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/The current branch is master./);
    global.GIT_BRANCH = branch;
  });

  it('handles deployment successfully', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'master';
    const serverConfig2 = { ...serverConfig };
    serverConfig2.master.active = true;
    serverConfig2.master.server = '';
    serverConfig2.master.destPath = path.resolve(__dirname, './rsync-target-dir');
    serverConfig2.master.username = '';
    delete serverConfig2.master.port;

    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/total size is/);
    global.GIT_BRANCH = branch;
  });
});
