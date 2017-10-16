const glob = require('glob')
const { promisify } = require('util')
const { log } = console

const getFileList = promisify(glob)
const readFromList = require('../utils/readFromList')

const {
  loadPartials,
  loadHelpers,
  loadTemplates
} = require('../utils/hbsUtils')

/**
 * getDataFromFiles - Makes a list of files from the glob pattern and reads the
 * contents of those files
 *
 * @param {string} pattern Glob pattern that describes the files to be read
 * @returns {obj} Object with the path as key and the file contents as value
 */
const getDataFromFiles = async (pattern) => {
  return await readFromList(await getFileList(pattern))
}

/**
 * prepareLayouts - Registers partials and helpers to the passed handlerbars.js
 * instance and return it along with an object with compiled template functions
 *
 * @param {Object} paths      The resolved paths from config
 * @param {Object} handlebars Handlebars.js instance
 *
 * @returns {Object} Object with the instantiated handlebars instance and compiled templates
 */
async function prepareLayouts (paths, handlebars) {
  let templateList, partialList, helperList

  try {
    templateList = await getDataFromFiles(`${paths.templates}/**/*.html`)
    partialList = await getDataFromFiles(`${paths.partials}/**/*.html`)
    helperList = await getDataFromFiles(`${paths.helpers}/**/*.js`)

    loadPartials(handlebars, partialList)
    loadHelpers(handlebars, helperList)

    return loadTemplates(handlebars, templateList)
  } catch (error) {
    log(error)
  }
}

module.exports = prepareLayouts
