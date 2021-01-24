import UI from '../UI'

//排除css的一些只读属性和方法
export type CSSStyleDeclarationFixed = Omit<
  CSSStyleDeclaration,
  | 'length'
  | 'parentRule'
  | 'item'
  | 'getPropertyPriority'
  | 'setProperty'
  | 'getPropertyValue'
  | 'removeProperty'
>

// sailing 系统VNode 类型
export interface VNode {
  style?: CSSStyleDeclarationFixed
  class?: string
  id?: string
  child?: VNode[]
  group?: UIType,
  text?: string
}

export type UIType = keyof typeof UI.antdForVue3

export type Ele = HTMLElement | Element

