const hotEmitter = require('./emitter')

hotEmitter.on('webpackHotUpdate',(currentHash)=>{
  console.log(currentHash);
})