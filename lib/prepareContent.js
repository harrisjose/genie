const handlebars = require('handlebars')
const fm = require('gray-matter')
const MarkdownIt = require('markdown-it')
const glob = require('glob')
const { promisify } = require('util')

const getFileList = promisify(glob)
const readFilesInList = require('../utils/readFilesInList')

const { log } = console

const md = new MarkdownIt()

/**
 * parse - Parses the markdown content with gray-matter and markdown-it
 *
 * @param {Object} files Object with path as key and the markdown content in value
 * @returns {Object} Object with path as key and parsed data as value
 */
function parse (files) {
  let content = {}
  Object.entries(files).forEach(([file, data]) => {
    let parsedData = fm(data)
    parsedData['content'] = new handlebars.SafeString(md.render(parsedData['content']))
    content[file] = parsedData
  })
  return content
}

async function prepare (paths) {
  let contentFiles
  try {
    contentFiles = await getFileList(`${paths.content}/**/*.md`)
    contentFiles = await readFilesInList(contentFiles)
    return parse(contentFiles)
  } catch (error) {
    log(error)
  }
}

module.exports = prepare
