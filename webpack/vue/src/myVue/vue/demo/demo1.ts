import { reactive, watchEffect, computed } from 'vue'



const data = reactive({ b: 4 })

const comp = computed(() => {
  console.log('comp');
  return data.b + 7
})


console.log(comp.value);

console.log(comp.value);
console.log(comp.value);

data.b = 43


console.log(comp.value);




