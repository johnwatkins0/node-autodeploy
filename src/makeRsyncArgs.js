import { DEFAULT_RSYNC_ARGS } from '.';

/**
   * Make a string of default rsync args.
   * @param  {Array}  defaultArgs Default args.
   * @return {String} The string of default args plus any additional ones.
   */
export const makeRsyncArgs = (deployConfig) => {
  let args = DEFAULT_RSYNC_ARGS.map(arg => arg);

  if (deployConfig.include) {
    args = args.concat(
        deployConfig.include.map(glob => `--include=${glob}`),
      );
  }

  if (deployConfig.exclude) {
    args = args.concat(
        deployConfig.exclude.map(glob => `--exclude=${glob}`),
      );
  }

  return args.join(' ');
};
