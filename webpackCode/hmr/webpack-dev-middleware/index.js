// webpack 开发中间件
// 返回一个中间件,用来预览
const MemoryFileSystem = require('memory-fs')
const middleware = require('./middleware')
const fs = require('fs')
module.exports = function (complier) {
  complier.watch({}, () => {
    console.log('watch')
  })
  
  // const fs = (complier.outputFileSystem = new MemoryFileSystem())
  // 卸载内存里
  return middleware({
    fs,
    outputPath: complier.options.output.path,
  })
}
