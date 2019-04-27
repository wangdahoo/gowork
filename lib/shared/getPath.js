module.exports = (goVersion, pkgsetName) => [
  `$HOME/.gvm/pkgsets/${goVersion}/${pkgsetName}/bin`,
  `$HOME/.gvm/pkgsets/${goVersion}/${pkgsetName}/overlay/bin`,
  `$HOME/.gvm/pkgsets/${goVersion}/global/bin`,
  `$HOME/.gvm/pkgsets/${goVersion}/global/overlay/bin`,
  `$HOME/.gvm/gos/${goVersion}/bin`,
  `$HOME/.gvm/bin`
].join(':')
