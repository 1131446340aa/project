import { Noop, StrNumSym } from './type';
interface Effect {
  (): any,
  options?: {
    lazy: boolean,
    scheduler: () => {}
  }
}
let activeEffect: Effect
let effectStak: Effect[] = []

const createEffect = (fn: Noop, options) => {

  const reactiveEffect: Effect = function () {
    try {
      effectStak.push(reactiveEffect)
      activeEffect = reactiveEffect
      return fn()
    }
    finally {
      effectStak.pop()
      activeEffect = effectStak[effectStak.length - 1]
    }


  }
  reactiveEffect.options = options
  return reactiveEffect
}

const effect = (fn: Noop, options = { lazy: false, scheduler: () => { } }) => {
  const effect = createEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}

// data =>key = []
let targetMap: WeakMap<object, Map<StrNumSym, Set<Effect>>> = new WeakMap()
export const track = <T extends object>(target: T, key: StrNumSym) => {

  if (!activeEffect) return
  let depMap = targetMap.get(target)
  if (!depMap) { targetMap.set(target, depMap = new Map) }
  let keySet = depMap.get(key)
  if (!keySet) { depMap.set(key, keySet = new Set()) }
  keySet.add(activeEffect)

}

export const trick = <T extends object>(target: T, key: StrNumSym, type: 'add' | 'set') => {
  let depsMap = targetMap.get(target)
  if (!depsMap) return
  const runner = depsMap.get(key)
  if (type === 'add') {
    Array.isArray(target) && setRunner(depsMap.get('length'))
  }

  setRunner(runner)
}
export default effect

function setRunner(runner: Set<Effect>) {
  return runner?.forEach(effect => {
    if (effect.options.scheduler) {
      effect.options.scheduler()
    }


    effect();
  });
}
