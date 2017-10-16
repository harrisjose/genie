const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

async function readFromList (list) {
  let content = {}
  for (let file of list) {
    content[file] = await readFile(file, { encoding: 'utf8' })
  }
  return content
}

module.exports = readFromList
