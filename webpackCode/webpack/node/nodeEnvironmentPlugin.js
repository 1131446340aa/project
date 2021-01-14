const fs = require('fs')

class nodeEnvironmentPlugin {
  constructor(options) {
    this.options = options || {}
  }
  apply(complier) {
    complier.inputFileSystem = fs
    complier.outputFileSystem = fs
  }
}

module.exports = nodeEnvironmentPlugin
