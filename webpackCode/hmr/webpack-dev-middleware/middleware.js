const path = require('path')
const {getType} = require('mime')
module.exports = function wrapper({ fs, outputPath }) {
  // 负责预览
  // 拦截请求,看看请求的文件是不是webpack打包的文件,
  //如果是的话,从硬盘上读出来,返回给客户端
  return (req, res, next) => {
    let url = req.url
    if(url==='/') url = '/index.html'
    //绝对路径
    let filename = path.join(outputPath, url)
    
    try {
      let stats = fs.statSync(filename)
      if(stats.isFile()){
        let content = fs.readFileSync(filename) 
        res.setHeader('Content-Type',getType(filename))
        res.send(content)
      }else{
        res.sendStatus(404)
      }
    } catch (err) {
      res.sendStatus(404)
    }
  }
}
