const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('shelljs')
const { getSettings, getLaunch } = require('./vscode')
const Log = require('./shared/logger')
const highlight = chalk.greenBright.bold

// exec options
const opt = {silent: true}

const DEFAULT_GOLANG_VERSION = exec('go version', opt).split(' ')[2]
const GVM_ROOT = exec(`echo $GVM_ROOT`, opt).trim('\n')
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

const getGopath = (goVersion, workspace = 'global') => path.join(GVM_ROOT, `pkgsets`, goVersion, workspace)

const createProject = (projectName, options) => {
  const cwd = options.cwd
  const goVersion = options.golang || DEFAULT_GOLANG_VERSION

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
  exec(`cp -rf ${TEMPLATE_DIR} ${projectPath}`, opt)

  /** setup vscode settings */
  const vscode = `${projectPath}/.vscode`
  exec(`mkdir -p ${vscode}`, opt)
  // settings.json
  fs.writeFileSync(`${vscode}/settings.json`, JSON.stringify(getSettings(goVersion, pkgsetName), null, '  '))
  // launch.json
  fs.writeFileSync(`${vscode}/launch.json`, JSON.stringify(getLaunch(), null, '  '))

  Log.i(`project ${highlight(projectName)} created successfully.`)
  Log.i(`script to start:`)
  const start_script = highlight(`code ${cwd}/${projectName}`)
  console.log()
  console.log(`    ${start_script}`)
  console.log()
}

module.exports = {
  createProject
}
