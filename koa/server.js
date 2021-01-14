const Koa = require('./koaCode')

const app = new Koa()


app.use((ctx)=>{
  // console.log(ctx.req.url);
  console.log(ctx.url);
  // console.log(ctx.res.url);
  console.log(ctx.request.path);
  // console.log(ctx.request.url);
  // res.end('hello')
})

app.listen(3000,()=>{
  console.log('run');
})