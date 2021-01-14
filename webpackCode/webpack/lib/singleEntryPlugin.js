module.exports = class SingleEntryPlugin {
  constructor(context, entry, name) {
    this.context = context
    this.entry = entry
    this.name = name
  }
  apply(complier) {
    complier.hooks.make.tapAsync(
      'SingleEntryPlugin',
      (compilation, callback) => {
        const { context, entry, name } = this
        console.log('SingleEntryPlugin')
        // 入口
        compilation.addEntry(context, entry, name, callback)
      }
    )
  }
}
