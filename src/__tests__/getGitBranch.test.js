import { getGitBranch } from '..';

describe('getGitBranch function', () => {
  it('resolves an already-found git branch', async () => {
    global.GIT_BRANCH = 'my-branch';
    const gitBranch = await getGitBranch();
    expect(gitBranch).toBe('my-branch');
  });

  it('resolves the correct branch (assumed to be master)', async () => {
    global.GIT_BRANCH = null;
    const gitBranch = await getGitBranch();
    expect(gitBranch).toBe('master');
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
