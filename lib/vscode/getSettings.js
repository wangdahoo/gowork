module.exports = (goVersion, pkgsetName) => ({
    'go.gopath': `~/.gvm/pkgsets/${goVersion}/${pkgsetName}`,
    'go.buildOnSave': 'workspace',
    'go.toolsGopath': `~/.gvm/pkgsets/${goVersion}/global`,
    'http.proxy': 'http://localhost:8123'
})
