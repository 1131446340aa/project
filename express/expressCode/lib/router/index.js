const url = require('url')
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')
class Router{
  constructor(){
    this.stack = []
  }
  use(path,handle){
    if(typeof path === 'function'){
      handle = path
      path = '/'
    }
    let layer = new Layer(path,handle)
    this.stack.push(layer)
  }
  route(path){ 
    let route = new Route()
    let layer = new Layer(path,route.dispatch)
    layer.route = route
    this.stack.push(layer)
    return route
  }
  handle(req,res,done){
    let  { pathname} = url.parse(req.url)
    
    let idx = 0
    let next = ()=>{
      
      if(this.stack.length === idx){
        return done()
      }
      let layer = this.stack[idx++]
      if(layer.match(pathname)){
        if(layer.route){
          if( layer.route.matchMethod(req.method.toLowerCase())){
            layer.callback(req,res,next)
          }else{
            next()
          }
        }else{
          layer.callback(req,res,next)
        }
        
      }else{
        next()
      }
    }
     next()

  }
}


methods.forEach(method=>{
  Router.prototype[method] = function(path,...callbacks){
    let route = this.route(path)
    
    route[method](...callbacks)
  }
})


module.exports = Router


