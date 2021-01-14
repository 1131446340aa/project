const SingleEntryPlugin = require('./singleEntryPlugin')
const itemToPlugin = (context, entry, name) => {
  return new SingleEntryPlugin(context, entry, name)
}
module.exports = class EntryOptionsPlugin {
  apply(complier) {
    complier.hooks.entryOptions.tap('EntryOptionsPlugin', (context, entry) => {
      itemToPlugin(context, entry, 'main').apply(complier)
    })
  }
}
