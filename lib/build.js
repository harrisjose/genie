const handlebars = require('handlebars')
const { promisify } = require('util')
const glob = require('glob')
const getFileList = promisify(glob)

const log = require('../utils/log')
const Progress = require('../utils/progress')

const resolvePaths = require('../utils/resolvePaths')
const readFilesInList = require('../utils/readFilesInList')
const writeFilesInList = require('../utils/writeFilesInList')

const prepareContent = require('./prepareContent')
const prepareLayouts = require('./prepareLayouts')
const generateHtml = require('./generateHtml')
const generateFiles = require('./generateFiles')

const progress = new Progress()

/**
 * Globals to store content & templates so that they can be reused
 * for rebuilds
 */
let templates = {}
let content = {}
let htmlContent = {}

/**
 * generatePosts - Compiles layouts, converts markdown & generates html
 *
 * @param {Object} config      Configuration object
 * @param {Object} folderPaths Resolved paths
 *
 * @returns {Prmoise}
 */
async function generatePosts (config, folderPaths) {
  progress.start('🔮  Compiling templates...')
  templates = await prepareLayouts(folderPaths, handlebars)
  progress.done()

  progress.start('📔  Generating files...')
  content = await prepareContent(folderPaths)
  htmlContent = generateHtml(templates, content)
  progress.done()

  progress.start('📀  Writing files to disk...')
  await generateFiles(htmlContent, config.paths)
  progress.done()
}

async function processHtmlFiles (config, currentDir) {
  progress.start('🚚  Moving html files...')
  const { paths: { content: contentDir, output: outputDir } } = config

  const fileList = await getFileList(`${contentDir}/**/*.html`)
  let files = await readFilesInList(fileList)

  files = rewriteSourcePaths(files, contentDir, outputDir)
  await writeFilesInList(files)
  progress.done()
}

async function copyAssets (config, currentDir) {
  progress.start('🛍  Copying assets...')
  const { paths: { assets: assetDir, output: outputDir } } = config

  const fileList = await getFileList(`${assetDir}/**/*.*`)
  let files = await readFilesInList(fileList)

  files = rewriteSourcePaths(files, assetDir, outputDir)
  await writeFilesInList(files)
  progress.done()
}

async function build (config, currentDir) {
  progress.init(6)
  const folderPaths = getFolderPaths(config, currentDir)
  await generatePosts(config, folderPaths)
  await processHtmlFiles(config, currentDir)
  await copyAssets(config, currentDir)
  log.success('Build complete.')
}

module.exports = build

/**
 * Local Util functions
 */

function getFolderPaths ({ paths }, currentDir) {
  progress.start('🔍  Resolving paths...')
  const foldersToResolve = ['content', 'templates', 'partials', 'helpers', 'assets', 'output']
  const folderPaths = resolvePaths(foldersToResolve, paths, currentDir)
  progress.done()
  return folderPaths
}

function rewriteSourcePaths (filePathAndContent, fromDir, toDir) {
  return Object.keys(filePathAndContent).reduce((result, filePath) => {
    const outputPath = filePath.replace(fromDir, toDir)
    result[outputPath] = filePathAndContent[filePath]
    return result
  }, {})
}
