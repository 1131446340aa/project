import { defineComponent, reactive } from "vue";

export default defineComponent({

  setup(props) {
    let state = reactive({ a: 3 })
    return () => <div>{state.a}</div>
  }
})