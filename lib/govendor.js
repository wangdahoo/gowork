const getPath = require('./shared/getPath')

module.exports = (goVersion, pkgsetName, projectName) => {
  const path = getPath(goVersion, pkgsetName)

  return `#!/bin/bash
cd $HOME/.gvm/pkgsets/${goVersion}/${pkgsetName}/src/${projectName} && PATH="${path}:$PATH" GOPATH=$HOME/.gvm/pkgsets/${goVersion}/${pkgsetName} GOROOT=$HOME/.gvm/gos/${goVersion} govendor "$@"
`
}
