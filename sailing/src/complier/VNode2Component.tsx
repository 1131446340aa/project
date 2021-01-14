import { CSSStyleDeclarationFixed, VNode } from '@/common/interface'
import UI from '@/UI'
import getVNode from './dom2VNode'
let script = ''
const generateComponent = (VComponent: VNode) => {
  let template = ''
  let css = ''
  let domReg = /(<.*?)>/
  VComponent.child?.forEach((vComponentItem) => {
    // 编译虚拟组建转 template
    if (vComponentItem.id === 'sailContainer') {
      template += `<div ${
        vComponentItem.class ? 'class="' + vComponentItem.class + '"' : ''
      }>${generateComponent(vComponentItem).template}</div>`
    } else {
      UI.antdForVue3[vComponentItem.group!]?.forEach((i) => {
        if (i.id === vComponentItem.id) {
          if (!vComponentItem.class) {
            template += i.componentString
          } else {
            template += i.componentString.replace(
              domReg,
              `$1 class="${vComponentItem.class}">`
            )
          }

          if (i.outFile) {
            const importStr = `import ${i.componentString
              .replace(/<.*?><\/(.*)>/, '$1')
              .replace(/^\S/, (s) => s.toUpperCase())} from '${i.outFile}'`

            if (!script.includes(importStr)) {
              script += importStr
            }
          }
        }
      })
    }
    // 编译style 转less
    vComponentItem.class &&
      (css += `.${vComponentItem.class} {${cssObject2css(
        vComponentItem.style!
      )}`)
    let currenCss = generateComponent(vComponentItem).css
    if (vComponentItem.child?.length) {
      css += currenCss
    }
    vComponentItem.class && (css += '}')
  })

  return { css, template, script }
}

function getComponent() {
  console.log(generateComponent(getVNode()))
}

// css对象转字符串
function cssObject2css(css: CSSStyleDeclarationFixed) {
  let cssStr = ''
  Object.entries(css).forEach(([cssKey, cssValue]) => {
    cssStr += `${cssKey}: ${cssValue};`
  })
  return cssStr
}

export default getComponent
