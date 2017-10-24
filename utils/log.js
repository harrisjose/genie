const chalk = require('chalk')

function logImmediate (prefix, text) {
  console.log(`${prefix}  ${text}`)
}

function success (text) {
  logImmediate(chalk.green('success'), text)
}

function info (text) {
  logImmediate(chalk.blue('info'), text)
}

function error (text) {
  logImmediate(chalk.red('error'), text)
}

module.exports = { success, info, error }
