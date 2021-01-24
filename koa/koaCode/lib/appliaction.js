const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa{
  constructor(){
    //不能直接将request赋值给context
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middleWare = []
  }
  handleRequest(req,res){
    let ctx = this.createContext(req,res)
    ctx.statusCode = 404
    this.compose(ctx).then(
      res=>{
        if(typeof ctx.body =='undefined'){
          res.end('Not Found')
          return
        }
        res.end(ctx.body)
      }
    )
  }
  createContext(req,res){
    let ctx = Object.create(this.context)
    let request = Object.create(this.request)
    let response = Object.create(this.response)

    ctx.request = request
    ctx.response = response
    ctx.request.req = ctx.req =req
    ctx.response.res = ctx.res = res
    
    return ctx

  }
  compose(ctx){
     const  dispatch= (i)=>{
      if(i===this.middleWare.length) return Promise.response()
     let middleWare =  this.middleWare[i]
     return Promise.resolve( middleWare(ctx,()=>dispatch(i+1)))
     }
     return dispatch(0)
  }
  listen(...args){
   let server =  http.createServer(this.handleRequest.bind(this))
   server.listen(...args)
  }
  use(callback){
    this.middleWare.push(callback)
    this.callback =callback
  }
}

module.exports = Koa