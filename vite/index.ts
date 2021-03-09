// import { defineComponent } from 'vue';
function defineComponent<T extends string>(args: Readonly<T[]>) {
  return (a: T) => {
    console.log(a);

  }
}

let x = ['a', 'b'] as const

let emit = defineComponent(x)

