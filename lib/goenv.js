const getPath = require('./shared/getPath')

module.exports = (goVersion, pkgsetName) => {
  const path = getPath(goVersion, pkgsetName)

  return `#!/bin/bash
PATH="${path}:$PATH" GOPATH=$HOME/.gvm/pkgsets/${goVersion}/${pkgsetName} GOROOT=$HOME/.gvm/gos/${goVersion} exec "$@"
`
}
