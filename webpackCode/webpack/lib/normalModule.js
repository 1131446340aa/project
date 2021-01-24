const path = require('path')
const types = require('babel-types')
const generate = require('babel-generator').default
const traverse = require('babel-traverse').default
module.exports = class NormalModule {
  constructor({ name, context, rawRequest, resource, parser,async }) {
    this.name = name
    this.context = context
    this.rawRequest = rawRequest
    this.parser = parser
    this.resource = resource
    this.dependencies = []
    // 当前模块依赖那些异步模块
    this.blocks = []
    this.async = async
    this._source
    this._ast
  }
  build (compilation, callback) {
    this.doBuild(compilation, (err) => {
      this._ast = this.parser.parse(this._source)
      // 遍历语法书找到依赖
      traverse(this._ast, {
        //CallExpression 调用表达式
        CallExpression: (nodePath) => {
          let node = nodePath.node
          if (node.callee.name === 'require') {
            // 修改ast语法树节点,使用 __webpack_require__ 代替require()
            node.callee.name = '__webpack_require__'
            let moduleName = node.arguments[0].value
            let extName =
              moduleName.split(path.posix.sep).pop().indexOf('.') === -1
                ? '.js'
                : ''
            // 绝对路径
            let resource = path.posix.join(
              path.posix.dirname(this.resource),
              moduleName + extName
            )
            let moduleId = './' + path.posix.relative(this.context, resource)
            // 修改ast语法树路径
            node.arguments = [types.stringLiteral(moduleId)]
            this.dependencies.push({
              name: this.name,
              context: this.context, //根目录
              rawRequest: this.rawRequest, // 原始路径
              moduleId, //相对路径
              resource, //绝对路径
            })
          } // 如果是一个require节点
          else if (types.isImport(node.callee)) {
            let moduleName = node.arguments[0].value
            let extName =
              moduleName.split(path.posix.sep).pop().indexOf('.') === -1
                ? '.js'
                : '';
            let resource = path.posix.join(
              path.posix.dirname(this.resource),
              moduleName + extName
            )
            let moduleId = './' + path.posix.relative(this.context, resource)
            let reg = /webpackChunkName:\s*['"]([^'"]+)['"]/
            const name = node.arguments[0].value.replace(reg,'$1')
            nodePath.replaceWithSourceString(`__webpack_require__.e('${name}')`)
            this.blocks.push({
              context:this.context,
              entry:moduleId,
              async:true,
              name
            })
          }
        },
      })

      // 将转化后的ast 重新生成代码
      let { code } = generate(this._ast)
      this._source = code
      callback()
    })
  }
  doBuild (compilation, callback) {
    //从硬盘上读取文本
    this.getSource(compilation, (err, source) => {
      this._source = source
      callback()
    })
  }
  getSource (compilation, callback) {
    compilation.inputFileSystem.readFile(this.resource, 'utf8', callback)
  }
}
// 从硬盘上读取文本
// 可能不是一个js模块,可能要走loader转换,最终得到一个js模块,如果不是报错
// 把这个js模块代码通过parser转化成ast
// 分析ast 找到require和import模块
// 递归编译依赖的模块
// 递归上面5步直到编译完成所有模块

/*

  不管是本地模块还是第三方模块,最后的模块id都是相对当前路径;
*/
