import { DefineComponent, defineComponent, reactive } from 'vue'
import Store from '../../common/store'
import './index.less'
export default defineComponent({
  setup(props, { slots }) {
    const onConfirm = () => {
      let styleProto = data.val.split('-')
      let unit = styleProto.pop()

      Store.contextmenuElement!.style[
        Store.proveSelect as 'padding' | 'margin'
      ] = styleProto.join(unit + ' ') + unit
      Store.isContextmenu = false
      Store.isAdjustInput = false
      // console.log(Store)
    }
    const data = reactive({
      val: '',
    })
    return () => (
      <div id="adjustInput" v-show={Store.isAdjustInput}>
        <input type="text" class="adjustInput" v-model={data.val} />
        <button onClick={onConfirm}>确认</button>
      </div>
    )
  },
})
