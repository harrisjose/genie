const path = require('path')
const rimraf = require('rimraf')
const { promisify } = require('util')

const remove = promisify(rimraf)

const log = require('../utils/log')

async function clean (configPaths, currentDir) {
  const outputDir = configPaths['output']
  await remove(path.resolve(currentDir, outputDir))
  log.success(`🔥  Removed ${outputDir}/.`)
}

module.exports = clean
