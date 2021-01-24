declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 定义JSON5类型为JSON类型
declare module 'json5' {
  const JSON5: JSON
  export default JSON5
}