const express = require('./expressCode')

const app = express()

// 了,咔咔咔咔咔咔扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩,咔咔咔咔咔咔扩扩扩扩扩,,咔咔咔咔咔咔扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩,咔咔咔咔咔咔扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,kj


app.use('/get',()=>{
  console.log(22);
})

app.use('/',(req,res,next)=>{
  console.log(22);
  next()
})

app.get('/',(req,res)=>{
  console.log(21);
  res.end('ok')
})

app.post('/',(req,res)=>{
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




