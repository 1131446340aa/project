const path = require('path')
module.exports = function (complier) {
  const option = complier.options
  
  option.entry.main.import.unshift(require.resolve('../../client/index.js'))
  option.entry.main.import.unshift(require.resolve('../../hot/dev-server.js'))
  
  complier.hooks.entryOption.call(option.context, option.entry)
}
