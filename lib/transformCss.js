const path = require('path')
const postcss = require('postcss')

function getProcessor (config) {
  const { css: { postcssOptions } } = config
  const plugins = Object.keys(postcssOptions)
    .reduce((results, plugin) => {
      let resolvedPlugin = require(plugin)(postcssOptions[plugin])
      return results.concat([ resolvedPlugin ])
    }, [])
  return postcss(plugins)
}

async function transform (filesAndContent, config) {
  const cssTransform = getProcessor(config)

  return Object.keys(filesAndContent).reduce(async (results, fileName) => {
    if (path.parse(fileName)['ext'] === '.css') {
      let { css } = await cssTransform.process(filesAndContent[fileName])
      results[fileName] = css
    } else {
      results[fileName] = filesAndContent[fileName]
    }
    return results
  }, {})
}

module.exports = transform
