const path = require('path')
const postcss = require('postcss')

function getProcessor (config) {
  const { postcss: postcssOptions } = config
  const plugins = Object.keys(postcssOptions)
    .reduce((results, plugin) => {
      let resolvedPlugin = require(plugin)(postcssOptions[plugin])
      return results.concat([ resolvedPlugin ])
    }, [])
  return postcss(plugins)
}

async function transform (filesAndContent, config) {
  const cssTransform = getProcessor(config)
  let promises = {}

  for (let fileName in filesAndContent) {
    if (path.parse(fileName)['ext'] === '.css') {
      promises[fileName] = cssTransform.process(filesAndContent[fileName]).then(({css}) => {
        filesAndContent[fileName] = css
      })
    }
  }

  return Promise.all(Object.values(promises)).then(() => {
    return filesAndContent
  })
}

module.exports = transform
