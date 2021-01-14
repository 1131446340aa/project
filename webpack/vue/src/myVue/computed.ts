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

      if (dirty) {
        track(computed, 'value')
        value = effect(computedOptions.get, {
          lazy: true,
          scheduler() {
            dirty = true
            trigger(computed, 'value', 'set')
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