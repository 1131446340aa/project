<template>
  <div @click="add">{{state.x}}</div>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from 'vue'
import { reactive } from 'vue'
  const Props = defineProps({
    msg:{
      type:String,
      default:''
    }
  })

  let c = ['a','b'] as const
  const emit =defineEmit(['a'])
  emit('a')
  let state = reactive({x:3})
  const add = ()=>{
    state.x++
  }
 
 
</script>

