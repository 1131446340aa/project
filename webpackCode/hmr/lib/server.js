const express = require('express')
const http = require('http')
const updateComplier = require('./utils/updateComplier')
const webpackDevMiddleware = require('../webpack-dev-middleware')
const Socket = require('socket.io')

module.exports = class Server {
  constructor(complier, devServer) {
    this.complier = complier
    this.devServer = devServer
    updateComplier(complier)
    this.setupHooks()
    this.setupApp()
    this.routes()
    this.setupDevMiddleware()
    this.createServer()
    this.createSocketServer()
    this.sockets = []
  }
  routes() {
    if (this.devServer.contentBase) {
      this.app.use(express.static(this.devServer.contentBase))
    }
  }
  createSocketServer(){
    const webSocketServer = Socket(this.server)
    console.log(webSocketServer);
    // webSocketServer.on('')
    webSocketServer.on('connection',(socket)=>{
      console.log('connection');
      this.sockets.push(socket)
      socket.on('discontent',()=>{
        let index = this.sockets.indexOf(socket)
        this.sockets.splice(index,1)
      })
     
      if(this._stats){
        socket.emit('hash',this._stats.hash)
        socket.emit('ok')
      }
    })
  }
  setupDevMiddleware() {
    this.middleware = webpackDevMiddleware(this.complier)
    this.app.use(this.middleware)
  }
  setupHooks() {
    this.complier.hooks.done.tap('webpack-dev-server', (stats) => {
      this._stats = stats
      this.sockets.forEach(socket=>{
        socket.emit('hash',this._stats.hash)
        socket.emit('ok')
      })
      console.log('finally')
    })
  }
  setupApp() {
    this.app = express()
  }
  createServer() {
    this.server = http.Server(this.app)
  }
  listen(port, host, callback) {
    this.server.listen(port, host, callback)
  }
}
