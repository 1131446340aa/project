<template>
  <div class="main">
    <div class="main-list-item" v-for="(item, index) in data.a" :key="index">
      {{ item }}
    </div>
    <div>记算属性：{{ comp }}</div>
  </div>
</template>

<script lang="ts">
// import { reactive, computed, watchEffect } from 'vue'
import { reactive, computed, watchEffect } from './myVue/index'
import a from './test'
export default {
  setup() {
    const data = reactive({ a: [1], b: 4 })
    const comp = computed(() => {
      // console.log('computed')
      return data.b + 3
    })
    watchEffect(() => {
      // console.log(comp.value)
      console.log(data.a.length)
    })
    setTimeout(() => {
      data.a.push(3)
    }, 0)
    return { data, comp }
  },
}
</script>

<style >
</style>