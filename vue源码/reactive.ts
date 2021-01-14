import { computed } from "./computed"
import effect, { track, trick } from "./effect"

const reactive = <T extends object>(target: T): T => {
  if (target && typeof target === 'object') {
    return new Proxy(target, {
      get(target, key, receiver) {
        let val = Reflect.get(target, key, receiver)
        // // 依赖收集
        track(target, key)
        return val
      },
      set(target, key, val, receiver) {
        let oldVal = target[key]
        let hasKey = Object.prototype.hasOwnProperty.call(target, key)
        let value = Reflect.set(target, key, val, receiver)
        if (!hasKey) {
          trick(target, key, 'add')
        }
        else if (oldVal !== val) {
          // console.log(key, 2);
          // console.log(key);
          trick(target, key, 'set')
        }
        // // 依赖触发
        return value
      }
    })
  }
  return target
}

const data = reactive({ a: [1], b: 4 })
// const data2 = reactive({ a: [] })
// const comp = computed(() => {
//   console.log('computed');
//   return data.b
// })
effect(() => {
  console.log(data.a.length);
})
// comp.value
// data.b = 2
// comp.value
// data.b = 2

data.a.push(3)


// data.b = 8

// console.log(comp.value);






