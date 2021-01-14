import { track, trigger } from "./effect"

export default function reactive<T extends object>(target: T): T {
  if (target && typeof target === 'object') {

    return new Proxy(target, {
      get(target, key, receiver) {
        let val = Reflect.get(target, key, receiver)
        // TODO 
        track(target, key)
        // data1 = > key = > [fn] 
        // console.log('get', key);
        return reactive(val)
      },
      set(target, key, value, receiver) {


        const oldValue = target[key]
        const hasKey = Object.prototype.hasOwnProperty.call(target, key)

        let val = Reflect.set(target, key, value, receiver)

        if (!hasKey) {
          trigger(target, key, 'add')
          // TODO 
        } else if (oldValue !== value) {

          trigger(target, key, 'set')
          // TODO 
        }
        //dom diff 
        // console.log('set', key);
        return val
      }
    })
  }
  return target
}
