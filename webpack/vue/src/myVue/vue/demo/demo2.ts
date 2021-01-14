const obj = {
  a: 3
}

Object.keys(obj).forEach(key => {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get defineProperty');
      return 3
    },
    set() {
      console.log('set defineProperty');
    }
  })
})

let proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(receiver === proxy);

    console.log('get proxy');
  },
  set() {
    console.log('set proxy');
    return true
  }
})
obj.a
obj.a = 4

proxy.a

proxy.a = 32