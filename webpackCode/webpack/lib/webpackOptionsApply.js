const EntryOptionsPlugin = require('./entryOptionsPlugin')
class WebpackOptionsApply {
  constructor(options, complier) {
    // this.process(options, complier)
  }
  process(options, complier) {
    new EntryOptionsPlugin().apply(complier)
    // 触发entryOptions 钩子
    complier.hooks.entryOptions.call(options.context, options.entry)
  }
}

module.exports = WebpackOptionsApply
