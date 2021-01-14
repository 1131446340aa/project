import { writeFileSync } from 'fs'
import axios, { AxiosRequestConfig } from 'axios'

function json2Class({
  fileName,
  className,
  jsonString
}: {
  fileName: string
  jsonString: string
  className: string
}) {
  try {


    let modelJson = JSON.parse(jsonString)
    console.log(modelJson)
    if (Array.isArray(modelJson)) {
      new Error('please is a Object Json')
    } else {
      console.log(object2Class(modelJson, className).code);

      writeFileSync(`${fileName}`, object2Class(modelJson, className).code)
    }
  } catch {
    console.log(1111);

    new Error('jsonString is an invalid jsonString')
  }
}

function object2Class(
  object: { [key: string]: any } | [],
  modelName: string,
  deep = 0
) {
  modelName = firstUpperCase(modelName)
  let code = ''
  if (modelName) {
    code = ` /*${modelName}*/
  export interface ${modelName} {
    `
  }
  let arrayDeep = ''
  let result = {
    code: '',
    modelName: ''
  }
  if (Array.isArray(object)) {
    deep++
    for (let i = 0; i < deep; i++) {
      arrayDeep += '[]'
    }
    if (object.length === 0) {
      return {
        code: '',
        modelName: 'any' + arrayDeep
      }
    } else if (object.length > 0) {
      if (
        (object as Array<any>)[0] &&
        typeof (object as Array<any>)[0] === 'object'
      ) {
        let res = object2Class((object as Array<any>)[0], modelName, deep)
        result.code = res.code
        if (Array.isArray((object as Array<any>)[0])) {
          result.modelName = res.modelName
        } else {
          result.modelName = `${modelName}${arrayDeep}`
        }
        return result
      } else {
        result.modelName = `${typeof (object as Array<any>)[0]}${arrayDeep}`
        return result
      }
    }
  } else {
    Object.keys(object).forEach(key => {
      if (object[key] && typeof object[key] === 'object') {
        let res = object2Class(object[key], key)
        code += `${key}: ${res.modelName};
    `
        code = `${res.code}
        
${code}`
      } else {
        code += `${key}: ${typeof object[key]};
    `
      }

      result.code = `${code}
    }`
      result.modelName = modelName + arrayDeep
    })
  }
  return result
}

function firstUpperCase(props: string) {
  return props.replace(/^\S/, s => s.toUpperCase())
}

async function generateClass(
  urlList: UrlSet[],
  options: typeof axios.defaults
) {
  options = Object.assign(axios.defaults, options)
  options.timeout || (options.timeout = 5000)
  options.withCredentials || (options.withCredentials = true)
  let resultUrl = urlList.map(urlItem => {
    if (!urlItem.methods) {
      urlItem.methods = 'get'
    }
    if (urlItem.methods === 'get') {
      return fetchGet(urlItem.url, urlItem.param)
    } else if (urlItem.methods === 'post') {
      return fetchPost(urlItem.url, urlItem.data)
    }
  })

  let res = await Promise.all(resultUrl)
  res.forEach((item, index) => {
    json2Class({
      fileName: urlList[index].fileName,
      className: urlList[index].modelName,
      jsonString: JSON.stringify(item)
    })
  })
}
interface UrlSet {
  methods?: 'get' | 'post'
  url: string
  param?: object
  data?: object
  modelName: string
  fileName: string
}

function fetch(url: string, obj: AxiosRequestConfig): Promise<object> {
  return new Promise((resolve, reject) => {
    axios(url, obj)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

async function fetchPost(url: string, data?: object) {
  return await fetch(url, {
    data,
    method: 'post',
    headers: { 'content-Type': 'application/json' }
  })
}
async function fetchGet(url: string, params?: object) {
  return await fetch(url, {
    params,
    method: 'get'
    // headers: { 'content-Type': 'application/json' }
  })
}

// generateClass([{
//   url: '',
//   fileName: 'intel.ts',
//   modelName: 'Intel.ts',
//   methods: 'post'
// }], {
//   baseURL: 'http://10.85.62.145:18083/api/ai/proxy/1',
//   timeout: 11111111
// })
json2Class({
  fileName: 'manner.ts',
  className: 'Manner',
  jsonString: JSON.stringify(
    {
      "status": 0,
      "msg": "ok",
      "data": {
        "productCnt": 5,
        "deviceCnt": 5,
        "appCnt": 5,

        "result": [
          {
            "sendCnt": 70,
            "receiveCnt": 90,
            "date": 23
          }
        ]
      }
    }

  )

})
// generateClass('','intel.ts')
// console.log(1);
