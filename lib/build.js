const handlebars = require('handlebars')

const log = require('../utils/log')
const Progress = require('../utils/progress')

const resolvePaths = require('../utils/resolvePaths')

const prepareContent = require('./prepareContent')
const prepareLayouts = require('./prepareLayouts')
const generateHtml = require('./generateHtml')
const generateFiles = require('./generateFiles')

async function build (config, currentDir) {
  const progress = new Progress()
  progress.init(4)

  progress.start('🔍  Resolving paths...')
  const foldersToResolve = ['content', 'output', 'templates', 'partials', 'helpers']
  const folderPaths = resolvePaths(foldersToResolve, config.paths, currentDir)
  progress.done()

  progress.start('🔮  Compiling templates...')
  let templates = await prepareLayouts(folderPaths, handlebars)
  progress.done()

  progress.start('📔  Generating posts...')
  let content = await prepareContent(folderPaths)
  let htmlContent = generateHtml(templates, content)
  progress.done()

  progress.start('🚚  Creating files...')
  await generateFiles(htmlContent, config.paths)
  progress.done()

  log.success('Build complete.')
}

module.exports = build
