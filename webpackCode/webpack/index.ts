
class PromisePool<T = any>{

  constructor(public promiseArr: (() => Promise<T>)[], public max: number) {
  }
  run() {
    this.max = Math.min(this.max, this.promiseArr.length)
    for (let i = 0; i < this.max; i++) {
      this.runOne()
    }
  }
  private runOne() {
    this.promiseArr.shift()().then(res => {
      this.promiseArr.length && this.runOne()
    })
  }
}
function setPromise<T>(value: T, timeout: number): () => Promise<T> {
  return () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(value)
      }, timeout);
    })
  }
}

const pool: (() => Promise<number>)[] = []
for (let i = 0; i < 2; i++) {
  pool.push(setPromise(Math.random(), Math.random() * 2000))
}

type Url = `http${'s' | ''}://${string}.${'cn' | 'com'}${string}`


// // 重载签名
// function add(x:string,y:string):string;
// function add(x:number, y:number):number;

//实现签名 对外不可见
function add(x: string | number, y: number | string): number | string {
  if (typeof x === 'string') {
    return x + ',' + y;
  } else {
    return x.toFixed() + (y as number).toFixed();

  }
}










let x = add(1, 2) // string
let y = add(2, 3) // number


