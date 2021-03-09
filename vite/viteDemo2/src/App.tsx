import { defineComponent, reactive } from 'vue'
export default {
  setup() {
    let state = reactive({ a: 3 })

    return () =>
      <div>{state.a}</div>

  }
}