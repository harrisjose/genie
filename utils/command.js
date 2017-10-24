const Command = function Command (args) {
  this.command = args[2] || null
  this.options = args.slice(3) || {}
}

Command.prototype.match = function (name, callback) {
  if (name === this.command) {
    callback(...this.options) // eslint-disable-line
  }
  return this
}

module.exports = Command
