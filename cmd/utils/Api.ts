

import http from './http'
import { message } from 'antd'
interface ApiParam<T extends string> {
  method: 'get' | 'delete' | 'post' | 'put'
  name: T
  url: string
}


type MapApi<T extends string> = {
  [K in T]: <M extends object>(urlOptions: object, body?: object, options?: object) => Promise<{ err: string, dat: M }>
}

class Api<T extends string>{
  mapApi: MapApi<T>
  constructor(private apiParam: ApiParam<T>[]) {
    this.mapApi = {} as MapApi<T>
    this.init()
  }
  private init() {
    this.apiParam.forEach(api => {
      this.mapApi[api.name] = async <T extends object>(urlOptions: object, body?: object, options?: object) => {
        if (api.method === 'get') {
          const { err, dat } = await http[api.method]({ url: api.url, ...urlOptions }, options)
          return { err, dat: dat as T }
        }
        else {
          const { err, dat } = await http[api.method]({ url: api.url, ...urlOptions }, body, options)

          return { err, dat: dat as T }
        }
      }
    })
  }
}

export default Api
