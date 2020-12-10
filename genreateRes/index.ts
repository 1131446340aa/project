#!/usr/bin/env node
const inquirer = require('inquirer')
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import axios from 'axios'
// import path from 'path'
const chalk = require('chalk')
const cwd = process.cwd()

const url = 'http://apim.v2.intra.xiaojukeji.com/auth/v1/interfaces'

let question = [
  {
    name: 'projectId',
    type: 'input',
    message: "请输入项目id"
  },
  {
    name: 'collectionId',
    type: 'input',
    message: "请输入分类ID"
  },
  {
    name: 'cookie',
    type: 'input',
    message: "请输入cookie"
  }
]
interface AllInterface {
  success: boolean,
  data: {
    collectionId: number
    id: number
    method: "GET" | "POST" | "DELETE" | "PUT"
    name: string
    path: string
    projectId: number
  }[]
}
class generateResponse {
  allInterface: AllInterface['data']
  projectId: number
  collectionId: number
  cookie: string
  constructor({ projectId, collectionId, cookie }: {
    projectId: number,
    collectionId: number,
    cookie: string
  }) {
    this.projectId = projectId
    this.collectionId = collectionId
    this.cookie = cookie
    this.init()
  }
  private async init() {
    let allData = await axios.get(url, {
      params: {
        projectId: this.projectId
      },
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        Cookie: this.cookie,
        Host: "apim.v2.intra.xiaojukeji.com",
        Referer: "http://apim.v2.intra.xiaojukeji.com/",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
      }
    })

    const allInterface = allData.data as AllInterface
    if (allInterface.success) {
      this.allInterface = allInterface.data.filter(item => item.collectionId === this.collectionId)
    }


    let resStr = ''
    for (let item of this.allInterface) {
      const res = await axios.get(url, {
        params: {
          interfaceId: item.id
        },
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "zh-CN,zh;q=0.9",
          "Connection": "keep-alive",
          Cookie: this.cookie,
          Host: "apim.v2.intra.xiaojukeji.com",
          Referer: "http://apim.v2.intra.xiaojukeji.com/",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
          "X-Requested-With": "XMLHttpRequest"

        }
      })

      const result: { success: boolean, data: Record<string, any> } = res.data
      if (result.success) {
        const name = item.method + item.path.replace(/\/(.)/g, ($0, $1) => {
          return $1.toUpperCase()
        })
        const fixedStr = result.data.resBody.replace(/\/\/(.*)/g, ($0, $1: string) => {
          if ($1.includes(`"`) || $1.includes(`'`)) {
            return '//' + $1
          } else {
            return ''
          }
        }).replace(/\,\s*\n\s*([\]\}])/g, '\n$1') // 删除注释
        // console.log(fixedStr && JSON.parse(fixedStr));

        resStr += object2Class(fixedStr && JSON.parse(fixedStr), name).code + '\n'

      }
    }
    writeFileSync(cwd + '/index1.ts', resStr)
  }
}

//对象转类型
function object2Class(object: { [key: string]: any } | [], modelName: string, deep = 0) {
  modelName = modelName.replace(/[\:\{\}]/g, "")
  modelName = firstUpperCase(modelName)
  let code = ''
  if (modelName) {
    //生成export 和注释
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
    //多维数组深度
    deep++
    for (let i = 0; i < deep; i++) {
      //根据深度生成数组纬度
      arrayDeep += '[]'
    }
    if (object.length === 0) {
      //如果是空数组，生成any[]
      return {
        code: '',
        modelName: 'any' + arrayDeep
      }
    } else if (object.length > 0) {

      if ((object as Array<any>)[0] && typeof (object as Array<any>)[0] === 'object') {
        //如果数组里面每一项是对象
        let res = object2Class((object as Array<any>)[0], modelName, deep)
        result.code = res.code
        //区分是多维数组还是数组对象
        if (Array.isArray((object as Array<any>)[0])) {
          // 数组直接堆数组纬度
          result.modelName = res.modelName
        } else {
          //对象生成新的接口同时要将类型改为接口名
          result.modelName = `${modelName}${arrayDeep}`
        }
        return result
      } else {
        //如果数组里面每一项不是对象
        result.modelName = `${typeof (object as Array<any>)[0]}${arrayDeep}`
        return result
      }
    }
  } else {
    Object.keys(object).forEach(key => {
      if (object[key] && typeof object[key] === 'object') {
        //如果对象的属性是对象，递归
        let res = object2Class(object[key], modelName + key)
        code += `${key}: ${res.modelName};
    `
        code = `${res.code}
        
${code}`
      }
      else {
        //如果对象的属性非对象，判断是不是null 通过 ``对齐格式，代码略丑
        if (object[key] !== null) {
          code += `${key}: ${typeof object[key]};
    `
        } else {
          code += `${key}: null;
    `
        }
      }

    })
    result.code = `${code}
  }`
    result.modelName = modelName + arrayDeep
  }
  return result
}

//首字母大写
function firstUpperCase(props: string) {
  return props.replace(/^\S/, s => s.toUpperCase())
}


(function () {
  if (!existsSync(cwd + '/interface.config.json')) {
    inquirer.prompt(question).then(answer => {
      writeFileSync(cwd + '/interface.config.json', JSON.stringify(answer, null, 2))
    })
  } else {
    console.log(chalk.red(''))
    inquirer.prompt([{
      name: 'exist',
      type: 'input',
      message: "配置文件已经存在,是否重写 y/others"
    }]).then(res => {
      if (res.exist === 'y') {
        inquirer.prompt(question).then(answer => {
          writeFileSync(cwd + '/interface.config.json', JSON.stringify(answer, null, 2))
        })
      }
    })
  }
  new generateResponse(JSON.parse(String(readFileSync(cwd + '/interface.config.json'))))

})()
