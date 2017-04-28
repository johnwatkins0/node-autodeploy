# node-autodeploy-wp

Associate branches of a Git project with remote servers.

## Installation

Install the package in your project:

```
npm install --save-dev node-autodeploy-wp
```

### .deploy-servers.js

Create a server config file, `.deploy-servers.js` in the project root. It should export a settings object like the example below:

```JavaScript
module.exports = {
  master: {
    active: false,
    server: 'server-hostname',
    destPath: '/path/on/the/server/',
    username: 'username',
    srcPath: `${__dirname}/`
  },
  staging: {
    active: true,
    server: 'server-hostname',
    destPath: '/path/on/the/server/',
    username: 'username',
    srcPath: `${__dirname}/`
  }
};
```

Each object key should be identical to the name of the Git branch you want to associate with the server. In the example above, the `staging` deployment will run if the current Git branch is `staging`.

The following settings are required in each settings object:

| Key | Type | Description |
|---|---|---|
| active | bool | If set to false, the deployment will never run. |
| server | string | The server hostname. |
| destPath | string | The absolute path to the project's destination on the server |
| username | string | A user with permissions to write to the destination directory on the server. |
| srcPath | string | The absolute path to the source directory. |

### .deploy-settings.js

Create a settings config file, `.deploy-settings.js` in the project root. This provides another JavaSript settings object to determine the behavior of the `rsync` command run by the script. Currently one field is supported:

| Key | Type | Description |
|---|---|---|
| exclude | array | An array of glob strings representing files and folders that shouldn't be synced to the server. |

Example:

```JavaScript
module.exports = {
  exclude: [
    '.deploy*',
    '*.json',
    'src',
    '.git*',
    'package.json',
    'tests',
    '.eslintrc',
    'node_modules/'
  ]
};
```

## Deploying

With the two settings files in place, execute the following in the project's root:

`node node_modules/node-autodeploy-wp`
