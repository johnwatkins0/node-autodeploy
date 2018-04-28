import path from 'path';
import { configFilesExist } from '..';

describe('configFilesExist function', () => {
  it('throws an error with two bad files', () => {
    expect(configFilesExist('some-path', 'some-path')).toMatchObject({ ok: false,
      message: 'No deploy server settings found in project. ' +
    'Create .deploy-servers.js. ' +
    'More: https://github.com/johnwatkins0/node-autodeploy' });
  });

  it('throws with a bad serverConfig file', () => {
    expect(configFilesExist('some-path', path.resolve(__dirname, './valid-directory/.deploy-servers.js'))).toMatchObject({ ok: false,
      message: 'No deploy server settings found in project. ' +
    'Create .deploy-servers.js. ' +
    'More: https://github.com/johnwatkins0/node-autodeploy' });
  });

  it('throws with a bad settingsConfig file', () => {
    expect(configFilesExist(path.resolve(__dirname, './valid-directory/.deploy-servers.js'), 'some-path')).toMatchObject({ ok: false,
      message: 'No deploy server settings found in project. ' +
    'Create .deploy-settings.js. ' +
    'More: https://github.com/johnwatkins0/node-autodeploy' });
  });

  it('returns true with two valid configs', () => {
    expect(configFilesExist(path.resolve(__dirname, './valid-directory/.deploy-servers.js'), path.resolve(__dirname, './valid-directory/.deploy-settings.js'))).toMatchObject({ ok: true });
  });
});
