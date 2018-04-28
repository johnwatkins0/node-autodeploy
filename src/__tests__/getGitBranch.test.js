import { getGitBranch } from '..';

describe('getGitBranch function', () => {
  it('resolves an already-found git branch', async () => {
    global.GIT_BRANCH = 'my-branch';
    const gitBranch = await getGitBranch();
    expect(gitBranch).toBe('my-branch');
  });

  it('resolves the correct branch (assumed to be HEAD for testing)', async () => {
    const branch = global.GIT_BRANCH;
    global.GIT_BRANCH = 'HEAD';
    const gitBranch = await getGitBranch();
    expect(gitBranch).toBe('HEAD');
    global.GIT_BRANCH = branch;
  });

  it('rejects with a bad command', async () => {
    global.GIT_BRANCH = null;
    global.GIT_GET_BRANCH_COMMAND = 'some-bad-command';
    try {
      await getGitBranch();
    } catch (e) {
      expect(e).toBe('ERROR: The current git branch could not be retrieved.');
    }
  });
});
