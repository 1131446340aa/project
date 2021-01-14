const { file } = require('babel-types')

module.exports = class Stats {
  constructor({ entries, modules, chunks, files }) {
    this.entries = entries
    this.modules = modules
    this.chunks = chunks
    this.files = files
  }
  toJSON() {
    return this
  }
}
