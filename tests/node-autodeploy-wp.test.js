import NodeAutodeployWP from '../src/node-autodeploy-wp';

test(
  'A nonexistent directory passed to the constructor prevents execution.',
  () => {
    expect(() => new NodeAutodeployWP('./nonexistent-directory').toThrow());
  }
);

test('The constructor accepts a path to an existing directory.', () => {
  expect(() => new NodeAutodeployWP('./empty-directory').not.toThrow());
});
