const chalk = require('chalk')

function log (prefix, text) {
  console.log(`${prefix}  ${text}`)
}

function success (text) {
  log(chalk.green('success'), text)
}

function info (text) {
  log(chalk.blue('info'), text)
}

function error (text) {
  log(chalk.red('error'), text)
}

module.exports = { success, info, error }
