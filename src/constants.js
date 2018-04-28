export const COMMAND_DEFAULTS = {
  encoding: 'utf8',
  maxBuffer: 20000 * 1024,
  killSignal: 'SIGTERM',
  cwd: process.env.PWD,
  env: null,
  timeout: 0,
};

export const DEFAULT_RSYNC_ARGS = [
  '--perms',
  '--chmod=Du+rwx',
  '-arv',
  '--delete',
  '--copy-links',
];
