/**
 * loadTemplates - Creates and returns template functions for each of the templates
 *
 * @param {Object} hbs       Handlebars.js instance
 * @param {Object} templates Object with path as key and handlebars content as value
 *
 * @returns {Object} Object with path as key and template function as value
 */
function loadTemplates (hbs, templates) {
  const list = Object.keys(templates)
  return list.reduce((results, template) => {
    results[template] = hbs.compile(templates[template])
    return results
  }, {})
}

/**
 * loadHelpers - Register the helpers with the passed Handlebars.js instance
 *
 * @param {Object} hbs     Handlebars.js instance
 * @param {Object} helpers Object with path as key and js content as value
 */
function loadHelpers (hbs, helpers) {
  return Object.entries(helpers).forEach(([name, helper]) => {
    hbs.registerHelper(name, helper)
  })
}

/**
 * loadHelpers - Register the partials with the passed Handlebars.js instance
 *
 * @param {Object} hbs      Handlebars.js instance
 * @param {Object} partials Object with path as key and html content as value
 */
function loadPartials (hbs, partials) {
  return Object.entries(partials).forEach(([name, partial]) => {
    hbs.registerPartial(name, partial)
  })
}

module.exports = { loadPartials, loadHelpers, loadTemplates }
