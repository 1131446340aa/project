import effect, { track, trick } from "./effect"


interface ComputedOPtions<T> {
  get: () => T,
  set: (val: T) => void
}
export function computed<T>(options: (() => T) | { get: () => T, set: (val: T) => void }) {
  let computedOptions = {} as ComputedOPtions<T>
  if (typeof options === 'function') {
    computedOptions.get = options
  }
  if (typeof options === 'object') {
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
            dirty = true
            trick(computed, 'value', 'set')
          }
        })()
        dirty = false
      }
      return value
    },
    set value(val: T) {
      computedOptions.set(val)
    }
  }
  return computed

}