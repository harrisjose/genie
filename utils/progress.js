const ora = require('ora')
const chalk = require('chalk')

const muted = chalk.grey

const progress = function () {
  this.spinner = null
  this.taskCount = 0
  this.currentTaskCount = 0
  this.isTaskRunning = false

  this.init = (count) => {
    this.spinner = ora()
    this.taskCount = count
    this.currentTaskCount = 0
  }

  this.start = (text) => {
    this.spinner.start(text)
    this.currentTaskCount++
    this.isTaskRunning = true
  }
  this.done = () => {
    if (this.isTaskRunning) {
      let symbol = muted(`[${this.currentTaskCount}/${this.taskCount}]`)
      this.spinner.stopAndPersist({ symbol: symbol })
      this.isTaskRunning = false
    }
  }
}

module.exports = progress
