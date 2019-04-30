const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('shelljs')
const { getSettings, getLaunch } = require('./vscode')
const Log = require('./shared/logger')
const highlight = chalk.greenBright.bold

// exec options
const opt = { silent: true }

const DEFAULT_GOLANG_VERSION = exec('go version', opt).split(' ')[2]
const GVM_ROOT = exec('echo $GVM_ROOT', opt).trim('\n')
const TEMPLATE_DIR = path.join(__dirname, './template/src')

const isGoInstalled = goVersion => {
  const re = new RegExp(`${goVersion}`)
  const stdout = exec(`gvm list | grep ${goVersion}`, opt)
  return re.test(stdout)
}

const install = goVersion => {
  const installed = isGoInstalled(goVersion)

  if (!installed) {
    const target = highlight(goVersion)
    Log.i(`installing ${target}...`)
    try {
      exec(`gvm install ${goVersion}`, opt)
      Log.i(`${target} successfully installed`)
    } catch (e) {
      Log.e(`fail to install ${target} due to:`)
      Log.e(e)
    }
  }
}

const getGopath = (goVersion, workspace = 'global') => path.join(GVM_ROOT, 'pkgsets', goVersion, workspace)

const createProject = (projectName, options) => {
  const cwd = options.cwd
  const goVersion = options.golang || DEFAULT_GOLANG_VERSION
  const govendor = options.govendor

  if (goVersion !== DEFAULT_GOLANG_VERSION) {
    install(goVersion)
  }

  Log.i(`using ${highlight(goVersion)} to create workspace`)

  /** create pkgset */
  const pkgsetName = `gowork_${projectName}`
  exec(`gvm use -f ${goVersion}`, opt)
  exec(`gvm pkgset delete ${pkgsetName}`, opt)
  exec(`gvm pkgset create ${pkgsetName}`, opt)

  /** init project */
  const globalGopath = getGopath(goVersion)
  const workspaceGopath = getGopath(goVersion, pkgsetName)
  Log.d(`go.gopath: ${workspaceGopath}`)
  Log.d(`go.toolsGopath: ${globalGopath}`)

  const projectPath = path.join(cwd, projectName)
  Log.d(`projectPath: ${projectPath}`)

  exec(`mkdir -p ${cwd}`, opt)
  exec(`cp -rf ${TEMPLATE_DIR}/. ${projectPath}`, opt)
  exec(`cp -rf ${TEMPLATE_DIR}/gitignore ${projectPath}/.gitignore`, opt)
  // create bin/pkg/src in pkgset directory
  exec(`mkdir -p ${workspaceGopath}/bin ${workspaceGopath}/pkg ${workspaceGopath}/src`, opt)

  /** setup vscode settings */
  const vscode = `${projectPath}/.vscode`
  exec(`mkdir -p ${vscode}`, opt)
  // settings.json
  fs.writeFileSync(`${vscode}/settings.json`, JSON.stringify(getSettings(goVersion, pkgsetName), null, '  '))
  // launch.json
  fs.writeFileSync(`${vscode}/launch.json`, JSON.stringify(getLaunch(), null, '  '))

  /** create ge */
  fs.writeFileSync(`${projectPath}/ge`, require('./goenv')(goVersion, pkgsetName))
  exec(`chmod +x ${projectPath}/ge`, opt)

  /** create govendor */
  if (govendor) {
    fs.writeFileSync(`${projectPath}/govendor`, require('./govendor')(goVersion, pkgsetName, projectName))
    exec(`chmod +x ${projectPath}/govendor`, opt)
  }

  /** link project */
  exec(`ln -sf ${projectPath} ${workspaceGopath}/src/${projectName}`)

  Log.i(`project ${highlight(projectName)} created successfully.`)
  Log.i('script to start:')
  const start_script = highlight(`code ${cwd}/${projectName}`)
  console.log()
  console.log(`    ${start_script}`)
  console.log()
}

const ensureProject = (projectName, options) => {
  const projectPath = options.cwd
  const goVersion = options.golang || DEFAULT_GOLANG_VERSION

  Log.d(`projectPath: ${projectPath}`)

  /** create pkgset */
  const pkgsetName = `gowork_${projectName}`
  exec(`gvm use -f ${goVersion}`, opt)
  exec(`gvm pkgset delete ${pkgsetName}`, opt)
  exec(`gvm pkgset create ${pkgsetName}`, opt)

  /** create bin/pkg/src in pkgset directory */
  const workspaceGopath = getGopath(goVersion, pkgsetName)
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
