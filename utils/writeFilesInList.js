const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const { promisify } = require('util')

const makeDirectory = promisify(mkdirp)
const writeFile = promisify(fs.writeFile)

const log = require('./log')

async function writeFiles (data) {
  const opts = { encoding: 'utf8' }

  const createdFiles = Object.keys(data).map((filePath) => {
    const { dir } = path.parse(filePath)
    return makeDirectory(dir).then(() => {
      return writeFile(filePath, data[filePath], opts)
    }).catch((error) => {
      log.error(error)
    })
  })

  return Promise.all(createdFiles)
}

module.exports = writeFiles
