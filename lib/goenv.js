module.exports = (projectName, GOROOT) => {
  return `#!/bin/bash GOPATH=$HOME/.gowork/workspace/${projectName} GOROOT=${GOROOT} exec "$@"
`
}
