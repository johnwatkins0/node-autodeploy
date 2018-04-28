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
    serverConfig2.master.active = true;
    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/The current branch is master./);
  });

  it('works with a port number', async () => {
    COMMAND_DEFAULTS.timeout = 2000;
    const serverConfig2 = { ...serverConfig };
    serverConfig2.master.active = true;
    serverConfig2.master.port = 20;
    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/The current branch is master./);
  });

  it('handles deployment successfully', async () => {
    const serverConfig2 = { ...serverConfig };
    serverConfig2.master.active = true;
    serverConfig2.master.server = '';
    serverConfig2.master.destPath = path.resolve(__dirname, './rsync-target-dir');
    serverConfig2.master.username = '';
    delete serverConfig2.master.port;

    const message = await maybeDeploy(serverConfig2, deployConfig);

    expect(message).toMatch(/total size is/);
  });
});
