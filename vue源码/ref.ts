import { track, trick } from './effect';

import reactive from "./reactive"

function isObject<T extends object>(val: T) {
  if (val && typeof val === 'object') {
    return true

  }
  return false
}

const convert = <T extends object>(val: T) => isObject(val) ? reactive(val) : val


class RefImpl<T extends object> {

  public readonly __v_isRef = true
  public _value: T
  constructor(public rawValue: T) {
    this.rawValue = rawValue
    this._value = convert(this.rawValue)
  }
  get value() {
    track(this, 'value')
    return this._value
  }
  set value(newVal) {
    this._value = convert(newVal)
    trick(this, 'value', 'set')
  }
}



export default function ref<T extends Object>(rawVal: T) {
  return new RefImpl(rawVal)
}

