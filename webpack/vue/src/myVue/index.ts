// import reactive from './reactive'
// import watchEffect from './effect'
// import computed from './computed'
// export { reactive, computed, watchEffect }

import { reactive, computed, watchEffect } from 'vue'
let data = { a: [4], b: 3 }
const comp = computed(() => {
  console.log('comp');
  return data.b
})
console.log(comp.value);
watchEffect(() => {
  console.log(data.b);

})
data.b = 56

let obj = {
  a: 3, b: 4
}

Object.keys(obj).forEach(key => {
  // if (typeof obj[key] === 'object') { // 递归
  // }
  Object.defineProperty(obj, key, {
    get() {
      console.log('get defineProperty');

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

    return 3
  },
  set(target, key, receiver) {
    console.log('set proxy');

    return true
  }
})

obj.a
obj.a = 99

proxy.a

proxy.a = 999





