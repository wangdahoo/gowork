const chalk = require('chalk')

const VERBOSE = 0
const DEBUG = 1
const INFO = 2
const WARN = 3
const ERROR = 4

process.env.LOGGER_LEVEL = process.env.LOGGER_LEVEL || VERBOSE

const color = {
  [VERBOSE]: 'gray',
  [DEBUG]: 'cyan',
  [INFO]: 'green',
  [WARN]: 'yellow',
  [ERROR]: 'red' 
}

const printer = {
  [VERBOSE]: 'log',
  [DEBUG]: 'debug',
  [INFO]: 'info',
  [WARN]: 'warn',
  [ERROR]: 'error'
}

class Logger {
  constructor(tag) {
    this.LEVEL = process.env.LOGGER_LEVEL || VERBOSE
    this.TAG = tag
  }

  print (LEVEL, args) {
    const { TAG } = this
    const decorator = chalk[color[LEVEL]]
    const tag = TAG && decorator(`[${TAG}]`)
    const content = args.map(arg => {
      return typeof arg === 'object'
        ? arg
        : decorator(arg)
    })
    console[printer[LEVEL]].call(this, tag, ...content)
  }

  v () {
    if (this.LEVEL <= VERBOSE) {
      const args = Array.prototype.slice.call(arguments)
      this.print(VERBOSE, args)
    }
  }

  d () {
    if (this.LEVEL <= DEBUG) {
      const args = Array.prototype.slice.call(arguments)
      this.print(DEBUG, args)
    }
  }

  i () {
    if (this.LEVEL <= INFO) {
      const args = Array.prototype.slice.call(arguments)
      this.print(INFO, args)
    }
  }

  w () {
    if (this.LEVEL <= WARN) {
      const args = Array.prototype.slice.call(arguments)
      this.print(WARN, args)
    }
  }

  e () {
    if (this.LEVEL <= ERROR) {
      const args = Array.prototype.slice.call(arguments)
      this.print(ERROR, args)
    }
  }
}

module.exports = new Logger('GOWORK')
