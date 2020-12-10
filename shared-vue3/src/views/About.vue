<template></template>

<script lang="ts">
import { reactive, ref, onMounted, onBeforeMount, toRefs } from 'vue'
export default {
  setup() {
    const data = reactive({
      num: 21,
    })
    const methods = {
      addNum() {
        data.num++
      },
      subNum() {
        data.num--
      },
    }
    return {
      ...toRefs(data),
      ...methods,
    }
  },
}
</script>

<style>
</style>