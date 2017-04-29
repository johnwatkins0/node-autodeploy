import NodeAutodeployWP from './node-autodeploy-wp';

/**
 * Entry point.
 */
export default function run() {
  const nodeAutodeploy = new NodeAutodeployWP();

  if (nodeAutodeploy.isValid()) {
    nodeAutodeploy.run();
  }
}
