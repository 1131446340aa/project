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
  }
  handleRequest(req,res){
    let ctx = this.createContext(req,res)
    this.callback(ctx)
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
  listen(...args){
   let server =  http.createServer(this.handleRequest.bind(this))
   server.listen(...args)
  }
  use(callback){
    this.callback =callback
  }
}

module.exports = Koa