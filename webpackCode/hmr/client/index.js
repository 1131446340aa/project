var hotEmitter = require('../hot/emitter')
const socket = require('socket.io')()

let currentHash

socket.on('hash',(hash)=>{
  currentHash =hash
})

socket.on('ok',()=>{
  reloadApp()
})

function reloadApp(){
  hotEmitter.emit('webpackHotUpdate',currentHash)
}