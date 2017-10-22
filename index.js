#!/usr/bin/env node

'use strict'

const path = require('path')
const deepmerge = require('deepmerge')

const log = require('./utils/log')
const Command = require('./utils/command')

const build = require('./lib/build')
const server = require('./lib/build')
const clean = require('./lib/clean')

const defaults = {
  paths: {
    content: 'content',
    templates: 'templates',
    partials: 'partials',
    helpers: 'helpers',
    assets: 'assets',
    output: 'site'
  },
  js: {
    inline: false,
    babelOptions: {}
  },
  css: {
    inline: false,
    postcssOptions: {
      'postcss-cssnext': {
        browsers: [
          '> 1%',
          'last 2 versions'
        ]
      },
      'postcss-csso': {
        preset: 'default'
      }
    }
  }
}

const currentDir = path.resolve(process.cwd())

const userConfig = require(`${currentDir}/genie.js`) || {}

const config = deepmerge(defaults, userConfig)

const cmd = new Command(process.argv)
cmd
  .match('build', () => build(config, currentDir))
  .match('server', () => server(config, currentDir))
  .match('clean', () => clean(config.paths, currentDir))
  .match('version', () => log.info(`Genie v0.0.1`))
