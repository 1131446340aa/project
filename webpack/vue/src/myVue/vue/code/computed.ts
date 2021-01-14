import effect, { track, trigger } from "./effect"

interface ComputedOptions<T> {
  get: () => T,
  set: (val: T) => void
}
export default function computed<T>(options: (() => T) | { get: () => T, set?: (val: T) => void }) {
  let computedOptions = {} as ComputedOptions<T>
  if (typeof options === 'function') {
    computedOptions.get = options
  }
  if (options && typeof options === 'object') {
    computedOptions.get = options.get
    computedOptions.set = options.set
  }
  let dirty = true
  let value: T
  const computed = {
    get value() {
      track(computed, 'value')
      if (dirty) {
        value = effect(computedOptions.get, {
          lazy: true,
          scheduler: () => {
            trigger(computed, 'value', 'set')
            dirty = true
          }
        })()
        dirty = false
      }
      return value
    },
    set value(val: T) {
      computedOptions.set?.(val)
    }
  }
  return computed

}



