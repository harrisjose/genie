const path = require('path')
/**
 * resolvePaths - Resolves the project folders with full folder paths
 *
 * @param {Object} paths      Object with paths
 * @param {string} currentDir Path of current dir
 *
 * @returns {Object} Object with resolved paths
 */
function resolvePaths (folders, paths, dirPrefix) {
  const resolvedPaths = Object.assign({}, paths)
  folders.forEach((dir) => {
    resolvedPaths[dir] = path.join(dirPrefix, resolvedPaths[dir])
  })
  return resolvedPaths
}

/**
 * rewriteSourcePaths - Changes the paths to match output directory
 *
 * @param {object} filePathAndContent
 * @param {string} fromDir
 * @param {string} toDir
 *
 * @returns {object} Object with filepaths changed to output dir
 */
function rewriteSourcePaths (filePathAndContent, fromDir, toDir) {
  return Object.keys(filePathAndContent).reduce((result, filePath) => {
    const outputPath = filePath.replace(fromDir, toDir)
    result[outputPath] = filePathAndContent[filePath]
    return result
  }, {})
}

module.exports = { resolvePaths, rewriteSourcePaths }
