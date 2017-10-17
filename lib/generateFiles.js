const path = require('path')
const { promisify } = require('util')

const mkdirp = require('mkdirp')
const makeDirectory = promisify(mkdirp)

const fs = require('fs')
const writeFile = promisify(fs.writeFile)

const log = require('../utils/log')

/**
 * getOutputDirPath - Returns directory path for the output file based on the
 * original file path
 *
 * @param {string} dirPath  Directory path of the original md file
 * @param {Object} config   Paths from configuration object
 *
 * @returns {string} Output directory path for the file
 */
function getOutputDirPath (dirPath, config) {
  let { content, output } = config
  return dirPath.replace(content, output)
}

/**
 * getFileName
 *
 * @param {string} dir  Description
 * @param {string} name Description
 *
 * @returns {string} Full file name of the file, with html extension
 */
function getFileName (dir, name) {
  return path.format({
    dir: dir,
    name: name,
    ext: '.html'
  })
}

/**
 * generate - Writes the generated content to files
 *
 * @param {Object} content     FilePaths and associated html
 * @param {Object} configPaths Paths from configuration
 *
 * @returns {Promise}
 */
function generate (content, configPaths) {
  let filePaths = Object.keys(content)
  let filesCreated = []

  filesCreated = filePaths.map((filePath) => {
    const { dir: folderPath, name: fileName } = path.parse(filePath)

    const outputDir = getOutputDirPath(folderPath, configPaths)

    return makeDirectory(outputDir).then(() => {
      const name = getFileName(outputDir, fileName)
      const opts = { encoding: 'utf8' }

      return writeFile(name, content[filePath], opts)
    }).catch((error) => {
      log.error(error)
    })
  })

  return Promise.all(filesCreated).catch((error) => {
    return log.error(`🚒  ${error}`)
  })
}

module.exports = generate
