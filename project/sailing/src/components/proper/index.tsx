import Notify from '@/common/Notify'
import {
  addEvent,
  createContainer,
  getElement,
  getParentNode,
  isNumber,
  swapElements,
} from '@/common/util'
import StaticStore from '../../common/staticStore'
import { defineComponent, reactive } from 'vue'
import Store from '../../common/store'
import './index.less'
import { message } from 'ant-design-vue'
export default defineComponent({
  setup() {
    const methods = {
      // 添加子元素
      addChildComponent() {
        Store.currentDom = Store.tempDom
        methods.reset('start')
      },
      // 重置
      reset(notify: keyof typeof StaticStore.messageMap) {
        Store.tempDom = null
        Store.isContextmenu = false
        Notify(notify)
      },
      // 添加父容器
      addParent() {
        Store.currentDom = Store.tempDom!
        const ParentNode = getParentNode(Store.tempDom!)
        // 先用div代替稍后替换div 直接clone会失去事件
        const div = document.createElement('div')
        ParentNode?.replaceChild(div, Store.tempDom!)
        let container = createContainer()
        // 添加事件
        container = addEvent(container, '容器', false)
        container.appendChild(Store.tempDom!)
        ParentNode?.replaceChild(container, div)
        methods.reset('startParent')
        Store.currentDom = getElement('body')
      },
      changeText() {
        console.log(data.textValue);

        Store.tempDom!.innerHTML = data.textValue
        methods.reset('fixText')
        Store.currentDom = getElement('body')
      },
      // 删除元素
      deleteElement() {
        const ParentNode = getParentNode(Store.tempDom!)
        ParentNode?.removeChild(Store.tempDom!)
        methods.reset('deleteElement')
        Store.currentDom = getElement('body')
      },
      // 移动元素
      moveElement(index: string) {
        data.value = ''
        // 判断数字合法
        if (!isNumber(index)) {
          return message.error('请输入正整数')
        }
        const ParentNode = getParentNode(Store.tempDom!)
        if (~~index > ParentNode!.children.length) {
          return message.error('请输入小于元素长度的数字')
        }
        // 交换元素
        swapElements(
          Store.tempDom!,
          ParentNode?.children[~~index - 1] as HTMLElement
        )
        methods.reset('swapElement')
        Store.currentDom = getElement('body')
      },

      fixText() {
        data.isInput = true

        // methods.reset('startParent')
        // Store.currentDom = getElement('body')
      }
    }

    const menu = [
      {
        value: '添加子组件',
        callBack: methods.addChildComponent,
        keys: 'addChild',
      },
      {
        value: '添加父容器',
        callBack: methods.addParent,
        keys: 'addParent',
      },
      {
        value: '移除元素',
        callBack: methods.deleteElement,
        keys: 'delete',
      },
      // {
      //   value: '移动元素',
      //   callBack: methods.moveElement,
      //   keys: 'move',
      // },
    ]
    let data = reactive({
      value: '',
      isInput: false,
      textValue: ''
    })
    return () => (
      <div class="sail-proper" v-show={Store.isContextmenu} id="sail-proper">
        <div class="sail-proper-item" v-show={Store.tempDom?.id === 'sailText'}
        >

          <span onClick={methods.fixText} v-show={!data.isInput}>修改文本</span>
          <input style={{
            width: '80px',
            height: '16px',
            border: '1px solid rgb(80, 126, 133)',
            margin: '0 5px',
          }} v-show={data.isInput} v-model={data.textValue} onKeydown={(e) => {
            if (e.key === 'Enter') {
              methods.changeText()
            }
          }}></input>
        </div>
        {menu.map((menuItem, index) => (
          <div
            key={index}
            class="sail-proper-item"
            v-show={!['addChild'].includes(menuItem.keys) || Store.isContainer}
            onClick={menuItem.callBack}
          >
            {menuItem.value}
          </div>

        ))}
        <div class="sail-proper-item">
          交换
          {
            <input
              v-model={data.value}
              style={{
                width: '40px',
                height: '16px',
                border: '1px solid rgb(80, 126, 133)',
                margin: '0 5px',
              }}
              onKeydown={(e) => {
                if (e.key === 'Enter') {
                  methods.moveElement(data.value)
                }
              }}
            ></input>
          }
          号元素
        </div>
      </div>
    )
  },
})
