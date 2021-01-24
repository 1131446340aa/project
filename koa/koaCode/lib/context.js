let proto = {}

function defineGetter(target,key){
  Object.defineProperty(proto,key,{
    get(){
      return this[target][key]
    },
    set(val){
      this[target][key] = val
    }
  })
}


defineGetter('request','path')

defineGetter('req','url')


defineGetter('response','body')
module.exports = proto