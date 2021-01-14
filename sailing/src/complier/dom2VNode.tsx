import { CSSStyleDeclarationFixed, UIType } from '@/common/interface'
import { VNode } from '../common/interface'
import UI from '../UI'
function getVNode() {
  let vNode: VNode = {
    child: [],
  }
  let body = document.getElementById('body')!
  vNode.child = generateVNode(body, vNode.child!)
  console.log(vNode)

  return vNode
}

// 将dom转化为虚拟组建树,容器组建进行递归，非容器组建入队
function generateVNode(ele: HTMLElement, parent: VNode[]) {
  Array.from(ele.children).forEach((container) => {
    if (container.id === 'sailContainer') {
      parent.push({
        style: cssText2Object((container as HTMLElement).style.cssText),
        class: container.getAttribute('data-class')!,
        child: generateVNode(container as HTMLElement, []),
        id: 'sailContainer',
      })
    } else {
      parent.push({
        style: cssText2Object((container as HTMLElement).style.cssText),
        class: container.getAttribute('data-class')!,
        id: container.id,
        group: container.getAttribute('data-group') as UIType,
      })
    }
  })
  return parent
}

// cssText 转对象
function cssText2Object(cssText: string) {
  let map = {} as CSSStyleDeclarationFixed
  console.log(cssText)

  cssText.split(';').forEach((cssProto) => {
    const [key, value] = cssProto.split(':')
    key &&
      value &&
      (map[key.trim() as keyof CSSStyleDeclarationFixed] = value.trim())
  })
  return map
}

export default getVNode
