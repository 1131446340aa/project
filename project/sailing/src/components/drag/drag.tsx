import { DefineComponent, defineComponent, nextTick, reactive, Ref, ref } from 'vue'
import './drag.less'
import UI from '../../UI'
import { addEvent, stopEvent } from '@/common/util'
import { UIType } from '@/common/interface'

export default defineComponent({
  props: {
    componentType: {
      type: String,
      default: '',
    },
    componentName: {
      type: String,
      default: '',
    },
    ids: {
      type: String,
      default: '',
    },
    childComponent: {}
  },
  setup(props) {

    let ChildComponent = props.childComponent as DefineComponent<{}, any, any>
    let tag = props.componentName


    const data = reactive({
      isShow: false,
    })
    let dragSelect = ref<HTMLElement>()
    function getMousePosition(
      dragSelect: Ref<HTMLElement | undefined>,
      e: MouseEvent
    ) {
      //让鼠标位置在盒子中心
      //尽量少用非空断言,这里为了方便偷偷用
      let width = dragSelect.value!.offsetWidth
      let height = dragSelect.value!.offsetHeight
      dragSelect.value!.style.top = e.clientY - height / 2 + 'px'
      dragSelect.value!.style.left = e.clientX - width / 2 + 'px'
    }
    let UIType = UI.antdForVue3
    const componentType = props.componentType as keyof typeof UIType
    const methods = {
      startDrag: (e: MouseEvent) => {
        window.onmousemove = methods.dragging
        window.onmouseup = methods.endDrag
        e.stopPropagation()
        e.stopImmediatePropagation()
        data.isShow = true
        nextTick(() => {
          getMousePosition(dragSelect, e)
        })
      },
      endDrag: (e: MouseEvent) => {
        if (!data.isShow) return
        stopEvent(e)
        data.isShow = false
        addEvent(dragSelect.value!, componentType)
        window.onmousemove = null
        window.onmouseup = null
      },
      dragging: (e: MouseEvent) => {
        if (!data.isShow) return
        stopEvent(e)
        getMousePosition(dragSelect, e)
      },
    }

    return () => (
      <div class="drag-box">
        <div class="drag-small-icon" onMousedown={methods.startDrag}>
          {tag}
        </div>
        <div
          class="drag-small-icon-shadow"
          v-show={data.isShow}
          ref={dragSelect}
        // onMousemove={methods.dragging}
        >
          {ChildComponent && (
            <ChildComponent data-group={componentType} id={props.ids} />
          )}
        </div>
      </div>
    )
  },
})
