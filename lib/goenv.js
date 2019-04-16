const getPath = (goVersion, pkgsetName) => [
  `$HOME/.gvm/pkgsets/${goVersion}/${pkgsetName}/bin`,
  `$HOME/.gvm/pkgsets/${goVersion}/${pkgsetName}/overlay/bin`,
  `$HOME/.gvm/pkgsets/${goVersion}/global/bin`,
  `$HOME/.gvm/pkgsets/${goVersion}/global/overlay/bin`,
  `$HOME/.gvm/gos/${goVersion}/bin`,
  `$HOME/.gvm/bin`
].join(':')

module.exports = (goVersion, pkgsetName) => {
  const path = getPath(goVersion, pkgsetName)

  return `#!/bin/bash
PATH="${path}:$PATH" GOPATH=$HOME/.gvm/pkgsets/${goVersion}/${pkgsetName} GOROOT=$HOME/.gvm/gos/${goVersion} exec "$@"
`
} 
