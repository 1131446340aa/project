const { SyncHook } = require('tapable')
const normalModuleFactory = require('./normalModuleFactory')
const Parser = require('./parser')
const { forEach } = require('neo-async').default
let parser = new Parser()
const Chunk = require('./chunk')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const mainTemplate = fs.readFileSync(
  path.join(__dirname, './template/main.ejs'),
  'utf-8'
)
const mainRender = ejs.compile(mainTemplate)

module.exports = class Compilation {
  constructor(complier) {
    this.complier = complier
    this.options = complier.options
    this.context = complier.context
    this.inputFileSystem = complier.inputFileSystem
    this.outputFileSystem = complier.outputFileSystem
    this.entries = []
    this.assets = {}
    this.files = []
    this.modules = []
    this.chunks = []
    this._modules = {} // key是模块id ,value是模块代码
    this.hooks = {
      successModel: new SyncHook(['module']),
      seal: new SyncHook(),
      beforeChunks: new SyncHook(),
      afterChunks: new SyncHook(),
    }
  }
  addEntry(context, entry, name, callback) {
    this._addModuleChain(context, entry, name, (err, module) => {
      callback(err, module)
    })
  }
  buildModule(module, afterBuild) {
    module.build(this, (err) => {
      // 模块编译成功
      this.hooks.successModel.call(module)
      afterBuild(err, module)
    })
  }
  // 把模块封装成代码块
  seal(callback) {
    this.hooks.seal.call()
    this.hooks.beforeChunks.call()
    for (const entryModel of this.entries) {
      const chunk = new Chunk(entryModel)
      this.chunks.push(chunk)
      chunk.modules = this.modules.filter(
        (module) => module.name === chunk.name
      )
    }
    
    this.hooks.afterChunks.call(this.chunks)
    this.createChunksAssets()
    callback()
  }
  createChunksAssets() {
    for (let i = 0; i < this.chunks.length; i++) {
      const chunk = this.chunks[i]
      const file = chunk.name + '.js'
      let source = mainRender({
        entryModuleId: chunk.entryModule.moduleId,
        modules: chunk.modules,
      })
      this.emitAssets(file, source)
    }
  }
  emitAssets(file, source) {
    this.assets[file] = source
    this.files.push(file)
  }
  _addModuleChain(context, rawRequest, name, callback) {
    this.createModule(
      {
        context,
        rawRequest,
        name,
        parser,
        resource: path.posix.join(context, rawRequest),
      },
      (entryModule) => this.entries.push(entryModule),
      callback
    )
  }
  processModuleDependencies(module, callback) {
    let dependencies = module.dependencies
    forEach(
      dependencies,
      (dependency, done) => {
        let { name, context, rawRequest, resource, moduleId } = dependency
        this.createModule(
          {
            context,
            rawRequest,
            name,
            parser,
            resource,
            moduleId,
          },
          null,
          done
        )
      },
      callback
    )
  }
  createModule(data, addEntry, callback) {
    //通过模块工厂创建一个模块
    let entryModule = normalModuleFactory.create(data)
    entryModule.moduleId =
      './' + path.posix.relative(this.context, entryModule.resource)
    this._modules[entryModule.moduleId] = entryModule

    addEntry && addEntry(entryModule)
    this.modules.push(entryModule)

    const afterBuild = (err, module) => {
      // 有依赖
      if (module.dependencies.length > 0) {
        this.processModuleDependencies(module, (err) => {
          callback(err, module)
        })
      } else {
        callback(err, module)
      }
    }
    this.buildModule(entryModule, afterBuild)
  }
}
