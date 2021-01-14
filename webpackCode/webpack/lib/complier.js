const NormalModuleFactory = require('./normalModuleFactory')
const Compilation = require('./compilation')
const Stats = require('./stats')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const {
  AsyncSeriesHook,
  SyncBailHook,
  AsyncParallelHook,
  SyncHook,
} = require('tapable')

class Complier {
  constructor(context) {
    // super()
    this.context = context
    this.outputFileSystem = fs
    this.hooks = {
      done: new AsyncSeriesHook(['stats']), //完毕触发
      entryOptions: new SyncBailHook(['context', 'entry']),
      compilation: new SyncHook(['compilation']), //开始一次新的编译
      thisCompilation: new SyncHook(['compilation']), //创建完成一次新的compilation
      make: new AsyncParallelHook(['compilation', 'params']), //构建
      beforeRun: new AsyncSeriesHook(['params']),
      run: new AsyncSeriesHook(['complier']),
      complier: new SyncHook(['complier']),
      beforeComplier: new AsyncSeriesHook(['params']),
      afterComplier: new AsyncSeriesHook(['compilation']),
      emit: new AsyncSeriesHook(['compilation']),
    }
  }
  run(callback) {
    console.log('complier run')
    const onCompiled = (err, compilation) => {
      this.emitAssets(compilation, (err) => {
        let stats = new Stats(compilation)
        this.hooks.done.callAsync(stats, (err) => {
          callback(err, stats)
        })
      })
    }

    this.hooks.beforeRun.callAsync(this, (err) => {
      this.hooks.run.callAsync(this, (err) => {
        this.complier(onCompiled)
      })
    })
  }
  emitAssets(compilation, callback) {
    const emitFiles = (err) => {
      const assets = compilation.assets
      let outputPath = compilation.options.output.path
      for (let file in assets) {
        let source = assets[file]
        let targetPath = path.posix.join(outputPath, file)
        this.outputFileSystem.writeFileSync(targetPath, source, 'utf-8')
      }
      callback()
    }
    //修改输出内容的最后机会
    this.hooks.emit.callAsync(compilation, () => {
      mkdirp(this.options.output.path, emitFiles)
    })
  }
  complier(onCompiled) {
    const params = this.newCompilationParams()
    this.hooks.beforeComplier.callAsync(params, (err) => {
      this.hooks.complier.call(params)
      const compilation = this.newCompilation(params)
      this.hooks.make.callAsync(compilation, (err) => {
        compilation.seal((err) => {
          this.hooks.afterComplier.callAsync(compilation, (err) => {
            onCompiled(err, compilation)
          })
        })
      })
    })
  }
  newCompilation(params) {
    const compilation = this.createCompilation()
    this.hooks.thisCompilation.call(compilation, params)
    this.hooks.compilation.call(compilation, params)
    return compilation
  }
  createCompilation() {
    return new Compilation(this)
  }
  newCompilationParams() {
    return {
      normalModuleFactory: new NormalModuleFactory(),
    }
  }
}

module.exports = Complier
