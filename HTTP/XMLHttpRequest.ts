import { createConnection, Socket } from 'net'
import { parse } from 'url'
enum ReadState {
  UNSEND,
  OPENED,
  HEADERS_RECEIVED,
  LOADING,
  DONE
}
type Methods = 'GET' | 'POST'
type Url = `http${'' | 's'}://${string}`
class MyXMLHttpRequest {
  readyState = ReadState['UNSEND']
  method: Methods = 'GET'
  url: Url
  headers = {
    Connection: 'keep-alive'
  }
  hostname = ''
  port = ''
  path = ''
  socket: Socket

  constructor() {

  }
  open(methods: Methods, url: Url) {
    this.method = methods
    this.url = url
    let { hostname, port, path } = parse(url)
    this.hostname = hostname
    this.path = path
    this.port = port
    this.headers['Host'] = `${hostname}:${port}`
    this.socket = createConnection({
      host: hostname,
      port: +port
    }, () => {
      this.socket.on('data', d => {
        const data = String(d)
        console.log(data);

      })
    })
  }
  setRequestHeader(header: string, value: unknown) {
    this.headers[header] = value
  }
  send() {
    let rows = []
    rows.push(`${this.method} ${this.url} HTTP/1.1`)
    rows.push(...Object.entries(this.headers).map(([key, value]) => {
      return `${key}: ${value}`
    }))
    let request = rows.join('\r\n') + '\r\n\r\n'
    this.socket.write(request)
  }
}

XMLHttpRequest