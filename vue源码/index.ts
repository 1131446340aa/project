import reactive from './reactive'

import effect from './effect'

import computed from './effect'

import ref from './ref'
export { reactive, effect, computed, ref }


let x = ref(4)

effect(() => {
  console.log(x.value);

})

x.value++
