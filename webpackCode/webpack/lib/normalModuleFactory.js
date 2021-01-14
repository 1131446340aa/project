const NormalModule = require('./normalModule')
class NormalModuleFactory {
  static create(data) {
    return new NormalModule(data)
  }
}
// console.log(NormalModuleFactory.create())
module.exports = NormalModuleFactory
