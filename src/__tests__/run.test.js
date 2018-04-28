import path from 'path';

import { run, COMMAND_DEFAULTS } from '..';

const { serverConfig } = global;

describe('run function', () => {
  it('handles deployment', async () => {
    const message = await run();
    expect(message).toMatch(/The current branch is master./);
  });

  it('handles config objects in global scope', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'HEAD';
    COMMAND_DEFAULTS.timeout = 2000;
    global.serverConfig.HEAD.active = true;
    const message = await run(path.resolve(__dirname, './valid-directory'));
    expect(message).toMatch(/Deploying to HEAD/);
    serverConfig.HEAD.active = false;
    COMMAND_DEFAULTS.timeout = 0;
    global.GIT_BRANCH = branch;
  });

  it('handles when config objects are not in global scope', async () => {
    const { serverConfig: originalServerConfig, deployConfig } = global;
    const savedServerConfig = { ...originalServerConfig };
    const savedDeployConfig = { ...deployConfig };
    delete global.serverConfig;
    delete global.deployConfig;

    COMMAND_DEFAULTS.timeout = 2000;
    const message = await run(path.resolve(__dirname, './valid-directory'));
    expect(message).toMatch(/The current branch is master./);
    COMMAND_DEFAULTS.timeout = 0;
    global.serverConfig = savedServerConfig;
    global.deployConfig = savedDeployConfig;
  });

  it('handles existing files with invalid data', async () => {
    const { serverConfig: originalServerConfig, deployConfig } = global;
    const savedServerConfig = { ...originalServerConfig };
    const savedDeployConfig = { ...deployConfig };
    delete global.serverConfig;
    delete global.deployConfig;

    COMMAND_DEFAULTS.timeout = 2000;
    const message = await run(path.resolve(__dirname, './files-exist-invalid-data'));
    expect(message).toBe('node-autodeploy: A config object is invalid.');
    COMMAND_DEFAULTS.timeout = 0;
    global.serverConfig = savedServerConfig;
    global.deployConfig = savedDeployConfig;
  });

  it('handles only one existing file', async () => {
    const { serverConfig: originalServerConfig, deployConfig } = global;
    const savedServerConfig = { ...originalServerConfig };
    const savedDeployConfig = { ...deployConfig };
    delete global.serverConfig;
    delete global.deployConfig;

    COMMAND_DEFAULTS.timeout = 2000;
    const message = await run(path.resolve(__dirname, './one-valid-config-file'));
    expect(message).toBe('No deploy server settings found in project. Create .deploy-settings.js. More: https://github.com/johnwatkins0/node-autodeploy');
    COMMAND_DEFAULTS.timeout = 0;
    global.serverConfig = savedServerConfig;
    global.deployConfig = savedDeployConfig;
  });
});
