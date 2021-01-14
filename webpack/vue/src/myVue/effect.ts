
interface EffectOptionsBase {
  lazy?: boolean;
  scheduler?: () => void;
  computed?: boolean
}

interface Effect {
  options?: EffectOptionsBase;
  (): any
}
let EffectStack: Effect[] = []
let activeEffect: Effect
function createEffect(fn: Function, options?: EffectOptionsBase): Effect {

  function reactiveEffect(): Effect {
    if (!EffectStack.includes(reactiveEffect)) {
      try {
        EffectStack.push(reactiveEffect)
        activeEffect = reactiveEffect
        return fn()
      }
      finally {
        EffectStack.pop()
        activeEffect = EffectStack[EffectStack.length - 1]
      }
    }


  }
  reactiveEffect.options = options
  return reactiveEffect

}

export default function effect(fn: Effect, options: EffectOptionsBase = { lazy: false }) {
  const effect = createEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}

let targetMap: WeakMap<object, Map<string | number | symbol, Set<Effect>>> = new WeakMap()

export function track<T extends object>(target: T, key: string | number | symbol) {
  if (!activeEffect) return
  let depsMap = targetMap.get(targetMap)
  depsMap || targetMap.set(target, depsMap = new Map)
  let deps = depsMap.get(key)
  deps || depsMap.set(key, deps = new Set)
  deps.add(activeEffect)
}

export function trigger<T extends object>(target: T, key: string | number | symbol, type: 'add' | 'set') {

  let depsMap = targetMap.get(target)
  if (depsMap) {
    if (Array.isArray(target) && type === 'add') {
      runner(depsMap, 'length')
    }
    runner(depsMap, key)
  }
}

function runner(depsMap: Map<string | number | symbol, Set<Effect>>, key: string | number | symbol) {
  depsMap.get(key)?.forEach(effect => {
    if (effect.options.scheduler) {
      effect.options.scheduler()
    }
    else {
      effect()
    }
  })
}

