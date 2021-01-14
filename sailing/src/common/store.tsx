import { reactive } from 'vue'
import { getElement } from './util'
// 响应式数据
const Store = reactive({
  currentDom: null as HTMLElement | null,
  isContextmenu: false,
  isAdjustInput: false,
  properClientX: '0px',
  properElement: null as HTMLElement | null,
  proveSelect: '',
  contextmenuElement: null as HTMLElement | null,
  isShowModel: false,
  tempDom: null as HTMLElement | null,
  isContainer: false,
})



//默认id为body 元素
setTimeout(() => {
  Store.currentDom = getElement('body')
  Store.properElement = getElement('sail-proper')
})
export default Store
