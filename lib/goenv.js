const GOPROXY = "https://mirrors.aliyun.com/goproxy"

module.exports = (projectName, GOROOT) => {
  return `#!/bin/bash
GOPROXY=${GOPROXY} GOROOT=${GOROOT} GOPATH=$HOME/.gowork/workspace/${projectName}:${GOROOT} exec "$@"
`
}
