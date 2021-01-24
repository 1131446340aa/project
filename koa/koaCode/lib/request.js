const url = require('url')

module.exports = {
  get path(){

   return this.req.url
  },
  set query(val){
    let {query} = url.parse(this.req.url,true)
    return query
  }
}