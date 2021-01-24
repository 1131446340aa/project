const express = require('./expressCode')

const app = express()

// 中间件一般在路由之前执行


// app.use('/get',()=>{
//   console.log(22);
// })

app.get('/',(req,res)=>{
  console.log(21);
  res.end('ok')
})

app.get('/get',(req,res,next)=>{
  console.log(4);
  res.end('22')
  next()
})

app.listen('3000',()=>{

})




