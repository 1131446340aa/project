const Layer = require('./layer')
const methods = require('methods')
class Route {
  constructor(){
    this.stack = []
    this.methods = {}
  }
  dispatch= (req,res,out)=>{
    let idx = 0
    let next = ()=>{
      if(this.stack.length === idx){
        return out()
      }
      
      let layer = this.stack[idx++]
      if(layer.method===req.method.toLowerCase()){
        
        layer.callback(req,res,next)
      }else{
        next()
      }
    }
    next()
  }
  matchMethod(method){
    return this.methods[method]
  }
  
}


methods.forEach(method=>{
  Route.prototype[method] = function(callbacks){
    callbacks.forEach(callback=>{
      const layer= new Layer('',callback)

      layer.method = method
      this.methods[method] = true
      this.stack.push(layer)
    })
    
  }
})


module.exports = Route