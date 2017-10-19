const handlebars = require('handlebars')
const { promisify } = require('util')
const glob = require('glob')
const getFileList = promisify(glob)

const log = require('../utils/log')
const Progress = require('../utils/progress')

const { resolvePaths, rewriteSourcePaths } = require('../utils/pathHelpers')
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
 * @returns {Promise}
 */
async function generatePosts (config, folderPaths) {
  progress.start('🔮  Compiling templates...')
  templates = await prepareLayouts(folderPaths, handlebars)
  progress.done()

  progress.start('📔  Generating html files...')
  content = await prepareContent(folderPaths)
  htmlContent = generateHtml(templates, content)
  progress.done()

  progress.start('📀  Writing files to disk...')
  await generateFiles(htmlContent, config.paths)
  progress.done()
}

/**
 * processHtmlFiles - Process all html files (minifying and inlining) and
 * write them to disk.
 *
 * @param {object} config     Configuration object
 * @param {string} currentDir Current working directory
 *
 * @returns {Promise}
 */
async function processHtmlFiles (config, currentDir) {
  progress.start('🚚  Moving html files...')
  const { paths: { content: contentDir, output: outputDir } } = config

  const fileList = await getFileList(`${contentDir}/**/*.html`)
  let files = await readFilesInList(fileList)

  files = rewriteSourcePaths(files, contentDir, outputDir)
  await writeFilesInList(files)
  progress.done()
}

/**
 * processAssetFiles - Description
 *
 * @param {type} config     Configuration object
 * @param {type} currentDir Current working directory
 *
 * @returns {type} Description
 */
async function processAssetFiles (config, currentDir) {
  progress.start('🚚  Copying assets...')
  const { paths: { assets: assetDir, output: outputDir } } = config

  const fileList = await getFileList(`${assetDir}/**/*.*`)
  let files = await readFilesInList(fileList)

  files = rewriteSourcePaths(files, assetDir, outputDir)
  await writeFilesInList(files)
  progress.done()
}

/**
 * getFolderPaths - Description
 *
 * @param {object} Config.paths
 * @param {type}   currentDir
 *
 * @returns {object} Folder paths resolved to current project directory
 */
function getFolderPaths ({ paths }, currentDir) {
  progress.start('🔍  Resolving paths...')
  const foldersToResolve = ['content', 'templates', 'partials', 'helpers', 'assets', 'output']
  const folderPaths = resolvePaths(foldersToResolve, paths, currentDir)
  progress.done()
  return folderPaths
}

/**
 * build - Orchestration function for running full build
 *
 * @param {type} config     Configuration object
 * @param {type} currentDir Current working directory
 *
 * @returns {Promise}
 */
async function build (config, currentDir) {
  progress.init(6)
  const startTime = Date.now()
  const folderPaths = getFolderPaths(config, currentDir)
  await generatePosts(config, folderPaths)
  await processHtmlFiles(config, currentDir)
  await processAssetFiles(config, currentDir)
  const processTime = (Date.now() - startTime) / 1000
  log.success(`Build complete in ${processTime}s`)
}

module.exports = build
