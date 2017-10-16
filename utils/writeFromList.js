const fs = require('fs')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)

async function writeFiles (data) {
  for (let file of data) {
    await writeFile(file, data[file], { encoding: 'utf8' })
  }
}

module.exports = writeFiles
