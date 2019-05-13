module.exports = (projectName, GOROOT) => ({
  'go.gopath': `~/.gowork/workspace/${projectName}`,
  'go.goroot': `${GOROOT}`,
  'go.buildOnSave': 'package',
  'go.toolsGopath': `~/.gowork/workspace/.tools`,
  'go.lintTool': 'golangci-lint'
})
