class layer {
  constructor(path, callback) {
    this.path = path;
    this.callback =callback
    this.method = ''
  }
  match(pathname){
    if(this.path ===pathname){
      return true
    }
    if(!this.path){
      if(this.path=='/'){
        return true
      }
      return pathname.startWith(this.path + '/')

    }
    return false
  }
}

module.exports = layer