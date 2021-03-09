 function add(...param){
   if(add.value===undefined){
     add.value = 0
   }
   add.sumOf = ()=>add.value
   return param.reduce((all,item)=>all+item,add.value)
 }

console.log( add(2)(3,4).sumOf())
 