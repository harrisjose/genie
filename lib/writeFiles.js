const path = require('path')

const { rewriteSourcePaths } = require('../utils/pathHelpers')
const writeFilesInList = require('../utils/writeFilesInList')

function rewriteExtensions (filePathAndContent, ext) {
  return Object.keys(filePathAndContent).reduce((result, filePath) => {
    const { dir, name } = path.parse(filePath)
    const rewrittenPath = path.format({ dir, name, ext })
    result[rewrittenPath] = filePathAndContent[filePath]
    return result
  }, {})
}

async function writeToDisk (content, config) {
  const { paths: { content: contentDir, output: outputDir } } = config
  content = rewriteSourcePaths(content, contentDir, outputDir)
  content = rewriteExtensions(content, '.html')
  await writeFilesInList(content)
}

module.exports = writeToDisk
