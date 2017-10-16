/**
 * makeRegex - Generate a regex that can be used to search for the `layout` prop
 * specified in markdown files with actual template paths
 *
 * @param {string} type      the layout prop ie.. name of template
 * @param {string} extension File extension of template
 *
 * @returns {regex}
 */
const makeRegex = (type, extension) => {
  type = new RegExp(type).toString().slice(1, -1)
  return new RegExp(`${type}\\.${extension}$`, 'g')
}

/**
 * find - Returns the template function for a given 'layout'
 *
 * @param {Object} templates Object with template paths and content
 * @param {string} type      Name of template ie.. 'layout'
 *
 * @returns {function} Compiled template function
 */
function find (templates, type) {
  type = makeRegex(type, 'html')
  let fn = () => {}
  for (let name in templates) {
    if (templates.hasOwnProperty(name) && type.test(name)) {
      fn = templates[name]
      break
    }
  }
  return fn
}

module.exports = find
