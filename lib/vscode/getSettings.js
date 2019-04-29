module.exports = (goVersion, pkgsetName) => ({
  'go.gopath': `~/.gvm/pkgsets/${goVersion}/${pkgsetName}`,
  'go.goroot': `~/.gvm/gos/${goVersion}`,
  'go.buildOnSave': 'package',
  'go.toolsGopath': `~/.gvm/pkgsets/${goVersion}/global`,
  'go.lintTool': 'golangci-lint'
})
