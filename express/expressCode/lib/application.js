


const http = require('http')
const Routes  = require('./router')
const methods = require('methods')
class Application{
  constructor(){
    this._routes = new Routes()
  }

  listen(...args){
   
    const server = http.createServer((req,res)=>{
      
      function done(){
        res.end(`Cannot ${req.method} ${req.url}`)
      }
       this._routes.handle(req,res,done)
       console.log(this._routes.stack);
    })
    server.listen(...args)
  }
  use(path,handle){
    this._routes.use(path,handle)
  }
}
methods.forEach(method=>{
  Application.prototype[method] = function(path,...callbacks){
    this._routes[method](path,callbacks)
  }
})


module.exports = Application