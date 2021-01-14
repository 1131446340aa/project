import { track, trigger } from "./effect"

export default function reactive<T extends object>(target: T): T {
  if (target && typeof target === 'object') {

    return new Proxy(target, {
      get(target, key, receiver) {
        let val = Reflect.get(target, key, receiver)
        // console.log(`get ${String(key)}`);
        track(target, key)
        // data = > key = > [fn] 
        // data1 = > key = > [fn] 
        console.log(val, 3232);

        return reactive(val)
      },
      set(target, key, value, receiver) {
        // console.log(target, receiver);

        const oldValue = target[key]


        const hasKey = Object.prototype.hasOwnProperty.call(target, key)
        let val = Reflect.set(target, key, value, receiver)
        console.log(oldValue, val, value,);

        if (!hasKey) {
          // console.log(`add ${String(key)}`);
          trigger(target, key, 'add')
        }

        else if (value !== oldValue) {
          // console.log(`set ${String(key)}`, 6);
          trigger(target, key, 'set')
        }
        //dom diff 
        return val
      }
    })
  }
  return target
}
