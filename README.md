# node-autodeploy [![Build Status](https://travis-ci.org/johnwatkins0/node-autodeploy-wp.svg?branch=master)](https://travis-ci.org/johnwatkins0/node-autodeploy-wp)

Associate branches of a Git project with remote servers. Auto-sync your repository to the remote server over SSH. Useful for developers working with servers they have minimal control over.

## Installation

Install the package in your project:

```
npm install --save-dev @johnwatkins0/node-autodeploy
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
    port: 22
  }
};
```

Each object key should be identical to the name of the Git branch you want to associate with the server. In the example above, the `staging` deployment will run if the current Git branch is `staging`.

### Settings

| Key | Type | Description | Optional? |
|---|---|---|---|
| active | bool | If set to false, the deployment will never run. | required |
| server | string | The server hostname. | required |
| destPath | string | The absolute path to the project's destination on the server | required |
| username | string | A user with permissions to write to the destination directory on the server. | required |
| srcPath | string | The absolute path to the source directory. | required |
| port | number | The port number through which to sink to the remove server. | not required |

### .deploy-settings.js

Create a settings config file, `.deploy-settings.js` in the project root. This provides another JavaSript settings object to determine the behavior of the `rsync` command run by the script.

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
  ],
};
```

## Deploying

With the two settings files in place, execute the following in the project's root:

`node node_modules/node-autodeploy`

Or use the provided binary:

`node node_modules/.bin/autodeploy`

Or use an NPM script: 

```JSON
{
  "scripts": {
    "deploy": "autodeploy"
  }
}
