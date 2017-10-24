const babel = require('babel-core')
const path = require('path')

function transform (filesAndContent, config) {
  const { babel: babelOptions } = config

  return Object.keys(filesAndContent).reduce((results, fileName) => {
    if (path.parse(fileName)['ext'] === '.js') {
      let { code } = babel.transform(filesAndContent[fileName], babelOptions)
      results[fileName] = code
    } else {
      results[fileName] = filesAndContent[fileName]
    }
    return results
  }, {})
}

module.exports = transform
