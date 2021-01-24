import { defineComponent, onMounted } from 'vue'
import './index.less'
export default defineComponent({
  setup(props, { slots }) {
    onMounted(() => {
      document.getElementById('body')!.style.height =
        window.innerHeight - 50 + 'px'
    })
    return () => <div id="body"></div>
  },
})
