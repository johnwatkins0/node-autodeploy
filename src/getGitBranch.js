import branch from 'git-branch';

export const getGitBranch = () => new Promise(async (resolve) => {
  if (global.GIT_BRANCH !== null) {
    resolve(global.GIT_BRANCH);
  }

  const branchName = await branch();
  resolve(branchName);
});
