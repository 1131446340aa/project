let x = [Promise.resolve(3),Promise.reject(2)]

Promise.race(x).catch(res=>{
  console.log(res);
}).then(res=>{
  console.log(res);
})

Promise.all(x).catch(res=>{
  console.log(res);
}).then(res=>{
  console.log(res);
})