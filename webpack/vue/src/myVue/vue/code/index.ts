import reactive from './reactive'
import watchEffect from './effect'
import computed from './computed'
export { reactive, computed, watchEffect }


let data = reactive({ a: [3], b: 4 })





const comp = computed(() => {
  console.log('comp');
  return data.b + 7
})


console.log(comp.value);

console.log(comp.value);
console.log(comp.value);
data.b = 4343




