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

module.exports = resolvePaths
