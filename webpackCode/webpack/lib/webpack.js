let Complier = require('./complier')
const NodeEnvironmentPlugin = require('../node/nodeEnvironmentPlugin.js')
const webpackOptionsApply = require('./webpackOptionsApply')
const webpack = (options, callback) => {
  // 1 验证配置文件是否合法
  // 2 声明complier对象
  let complier = new Complier(options.context)
  complier.options = options

  new NodeEnvironmentPlugin().apply(complier) // 让complier可以写和读文件

  //3 挂载配置文件里提供的所有plugins
  if (options.plugins && Array.isArray(options.plugins)) {
    for (plugin of options.plugins) {
      plugin.apply(complier)
    }
  }
  new webpackOptionsApply().process(options, complier)
  return compiler
}

module.exports = webpack
