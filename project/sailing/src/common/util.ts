import Notify from "./Notify"
import Store from "./store"
import UI from '../UI'
import { Ele, UIType } from "./interface"
interface ElementPosParam {
  element: HTMLElement
  value: number
  dir: 'top' | 'left' | 'right' | 'bottom'
}
export function getElement(elementID: string) {
  return document.getElementById(elementID)
}
export function setElementPos({ element, value, dir }: ElementPosParam) {
  element.style[dir] = value + 'px'
}
export function getParentNode(element: Ele) {
  return element.parentNode
}
export function createContainer(): Ele {
  let container = document.createElement('div')
  container.id = 'sailContainer'
  container.className = 'sail-container'
  container.setAttribute('data-group', '容器')
  let div = document.createElement('div')
  div.appendChild(container)
  return div
}

export function addEvent(element: Ele, componentType: UIType, addChild = true): Ele {
  let cloneNode = element.cloneNode(true) as HTMLElement
  // 克隆节点不需要top，left
  cloneNode.style.top = ''
  cloneNode.style.left = ''
  let childNode = cloneNode.children[0] as HTMLElement
  const appendElement = (key: UIType) => {
    if (addChild) {
      childNode = Store.currentDom?.appendChild(
        childNode
      ) as HTMLElement
    }
    let clientX = 0
    childNode.addEventListener('mousedown', (e) => {
      clientX = e.clientX
      if (e.target !== e.currentTarget) return
      stopEvent(e)
    })

    childNode.addEventListener('contextmenu', (e) => {
      stopEvent(e)
      e.preventDefault()
      Store.isContainer = childNode.id === 'sailContainer' ? true : false
      Store.isContextmenu = true
      Store.tempDom = childNode
      setElementPos({
        element: Store.properElement!,
        value: e.clientX,
        dir: 'left',
      })
      setElementPos({
        element: Store.properElement!,
        value: e.clientY,
        dir: 'top',
      })
    })
    childNode.addEventListener('mouseup', (e) => {
      if (Store.isContextmenu) return
      e.stopImmediatePropagation()
      e.stopPropagation()
      if (Math.abs(clientX - e.clientX) > 30) {
        if (Store.currentDom?.children.length) {
          Store.currentDom!.style.height = 'auto'
        }
        // 关闭改变要插入的父级元素
        Store.currentDom = getElement('body')
        Notify('close')
      } else {
        Store.contextmenuElement = e.currentTarget as HTMLElement
        Store.isShowModel = true
      }
    })
    Notify(key)
  }
  let componentMap = new Map<UIType, typeof appendElement>()
  Object.keys(UI.antdForVue3).forEach((key) => {
    componentMap.set(key as UIType, appendElement)
  })
  componentMap.get(componentType)?.(componentType)
  return childNode
}

export function stopEvent(e: MouseEvent) {
  e.stopPropagation()
  e.stopImmediatePropagation()
}

// 交换两个元素位置
export function swapElements(a: HTMLElement, b: HTMLElement) {
  if (a == b) return
  //记录父元素
  let bp = b.parentNode!,
    ap = a.parentNode!
  //记录下一个同级元素
  let an = a.nextElementSibling,
    bn = b.nextElementSibling
  //如果参照物是邻近元素则直接调整位置
  if (an == b) return bp.insertBefore(b, a)
  if (bn == a) return ap.insertBefore(a, b)
  if (a.contains(b))
    //如果a包含了b
    return ap.insertBefore(b, a), bp.insertBefore(a, bn)
  else return bp.insertBefore(a, b), ap.insertBefore(b, an)
}


export function isNumber(index: string) {
  return (/[0-9]+/.test(index))
}