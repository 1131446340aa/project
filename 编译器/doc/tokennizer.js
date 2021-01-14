let esprima = require('esprima')
let estraverse = require('estraverse-fb')
let sourceCode =` <h1><span>hello</span>world</h1>`

let ast = esprima.parseModule(sourceCode,{jsx:true,tokens:true})
// 把源代码进行分词，得到一个token数组
// 把token数组转化成一个抽象语法树
console.log(ast);
let ident = 0
function padding(){
  return ' '.repeat(ident)
}
estraverse.traverse(ast,{
  enter(node){
    ident+2
  },
  leave(node){
    ident-=2
  }
})