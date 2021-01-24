import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => <div id="sailContainer" class="sail-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px' }}></div>
  },
})