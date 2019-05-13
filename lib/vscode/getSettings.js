module.exports = (projectName, GOROOT, TOOLS_GOPATH) => ({
  'go.gopath': `~/.gowork/workspace/${projectName}`,
  'go.goroot': `${GOROOT}`,
  'go.buildOnSave': 'package',
  'go.toolsGopath': `${TOOLS_GOPATH}`,
  'go.lintTool': 'golangci-lint'
})
