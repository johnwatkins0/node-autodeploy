import { makeRsyncArgs } from '..';

const { deployConfig } = global;

describe('makeRsyncArgs function', () => {
  it('successfully builds args', () => {
    expect(makeRsyncArgs(deployConfig)).toBe('--perms --chmod=Du+rwx -arv --delete --copy-links --include=dist --include=**.js --exclude=node_nodules');
  });

  it('successfully builds args with no exclude', () => {
    const config = { ...deployConfig };
    delete config.exclude;
    expect(makeRsyncArgs(config)).toBe('--perms --chmod=Du+rwx -arv --delete --copy-links --include=dist --include=**.js');
  });

  it('successfully builds args with no include', () => {
    const config = { ...deployConfig };
    delete config.include;
    expect(makeRsyncArgs(config)).toBe('--perms --chmod=Du+rwx -arv --delete --copy-links --exclude=node_nodules');
  });
});
