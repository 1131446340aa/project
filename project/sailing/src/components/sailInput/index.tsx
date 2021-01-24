import { defineComponent, onMounted, ref, watch } from 'vue'
import './index.less'
export default defineComponent({
  props: {
    model: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    let input = ref()
    onMounted(() => {
      // console.log(props.model)

      input.value.value = props.model
    })
    watch([props], () => {
      input.value.value = props.model
    })
    return () => (
      <input
        type="text"
        class="sail-input"
        ref={input}
        onInput={(e) => {
          emit('getData', e.target)
        }}
      />
    )
  },
})
