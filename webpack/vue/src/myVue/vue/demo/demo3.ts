import { reactive, watchEffect } from "vue";

const data = reactive({ a: 3 })
const data1 = reactive({ a: 4 })
const data2 = reactive({ a: 5 })
watchEffect(() => {
  render(data)
  watchEffect(() => {
    render(data1)
    watchEffect(() => {
      render(data2)
    })
  })


})

function render(vNode) {
  vNode
}


data2.a = 434





