const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('shelljs')
const { getSettings, getLaunch } = require('./vscode')
const Log = require('./shared/logger')
const highlight = chalk.greenBright.bold

// exec options
const opt = { silent: true }

const GOROOT = exec('go env GOROOT', opt).trim('\n')

// .gowork
const GOWORK_ROOT = path.join(process.env.HOME, '.gowork')
if (!fs.existsSync(GOWORK_ROOT)) {
  fs.mkdirSync(GOWORK_ROOT)
}

const TEMPLATE_DIR = path.join(__dirname, './template/src')

const getGopath = (projectName, reset = false) => {
  const gopath = path.join(GOWORK_ROOT, 'workspace', projectName)

  if (reset) {
    exec(`rm -rf ${gopath} || true`, opt)
  }

  if (!fs.existsSync(gopath)) {
    exec(`mkdir -p ${gopath}`)
  }
  return gopath
}

const createProject = (projectName, options) => {
  const cwd = options.cwd

  /** create workspace (project gopath) */
  Log.i(`creating project...`)
  const workspaceGopath = getGopath(projectName)
  const toolsGopath = getGopath('.tools')
  Log.d(`go.gopath: ${workspaceGopath}`)
  Log.d(`go.toolsGopath: ${toolsGopath}`)

  const projectPath = path.join(cwd, projectName)
  Log.d(`projectPath: ${projectPath}`)

  exec(`mkdir -p ${cwd}`, opt)
  exec(`cp -rf ${TEMPLATE_DIR}/. ${projectPath}`, opt)
  exec(`cp -rf ${TEMPLATE_DIR}/.gitignore ${projectPath}/.gitignore`, opt)

  // create bin/pkg/src in workspace
  exec(`mkdir -p ${workspaceGopath}/bin ${workspaceGopath}/pkg ${workspaceGopath}/src`, opt)

  /** setup vscode settings */
  const vscode = `${projectPath}/.vscode`
  exec(`mkdir -p ${vscode}`, opt)
  // settings.json
  fs.writeFileSync(`${vscode}/settings.json`, JSON.stringify(getSettings(projectName, GOROOT, toolsGopath), null, '  '))
  // launch.json
  fs.writeFileSync(`${vscode}/launch.json`, JSON.stringify(getLaunch(), null, '  '))

  /** create ge */
  fs.writeFileSync(`${projectPath}/ge`, require('./goenv')(projectName, GOROOT))
  exec(`chmod +x ${projectPath}/ge`, opt)

  /** link project */
  exec(`ln -sf ${projectPath} ${workspaceGopath}/src/${projectName}`)

  Log.i(`project ${highlight(projectName)} created successfully.`)
  Log.i('script to start:')
  const start_script = highlight(`code ${path.join(cwd, projectName)}`)
  console.log()
  console.log(`    ${start_script}`)
  console.log()
}

const ensureProject = (projectName, options) => {
  const projectPath = options.cwd
  Log.d(`projectPath: ${projectPath}`)

  /** reset workspace */
  const workspaceGopath = getGopath(projectName, true)
  const toolsGopath = getGopath('.tools')
  Log.d(`go.gopath: ${workspaceGopath}`)
  Log.d(`go.toolsGopath: ${toolsGopath}`)

  /** create bin/pkg/src in workspace directory */
  exec(`mkdir -p ${workspaceGopath}/bin ${workspaceGopath}/pkg ${workspaceGopath}/src`, opt)

  /** link project */
  exec(`ln -sf ${projectPath} ${workspaceGopath}/src/${projectName}`, opt)

  Log.i('script to start:')
  const start_script = highlight(`code ${projectPath}`)
  console.log()
  console.log(`    ${start_script}`)
  console.log()
}

module.exports = {
  createProject,
  ensureProject
}
