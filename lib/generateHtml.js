const findTemplateFn = require('./findTemplates')

/**
 * makeHtml - Description
 *
 * @param {Object} templateFunctions Object with compiled template functions
 * @param {Object} contentFiles      Object with parsed data from markdown files
 *
 * @returns {Object} Object with path as key and generated html as value
 */
function generate (templateFunctions, contentFiles) {
  const mergedParams = (parsedData) => {
    let { data, content } = parsedData
    data['content'] = content
    return data
  }

  return Object
    .keys(contentFiles)
    .reduce((results, path) => {
      let params = mergedParams(contentFiles[path])
      let tempFn = findTemplateFn(templateFunctions, params['layout'])
      results[path] = tempFn(params)
      return results
    }, {})
}

module.exports = generate
