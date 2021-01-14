import axios from 'axios'
const superagent = require('superagent')
// const FormData = require('form-data')
// var params = new FormData();
// params.append('username', 'huanglihao_i');
// params.append('password', 'OGHsbx%152')
// // params.append('deviceid', 'null')
// params.append('redirect_uri', 'http://mis.diditaxi.com.cn/auth/?app_id=114&jumpto=http://sso.odin.intra.xiaojukeji.com/?callback=http://apim.v2.intra.xiaojukeji.com&callback_index=0')
// params.append('lcainfo', `{"AgentUuid":"VjFfMTAwMDAwMV8yMVRVMDlETE5DQ1IwN0pLQk1CR01BSzVVMQ","LocalUserAccount":"didi","LcaSsoToken":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWakZmTVRBd01EQXdNVjh5TVZSVk1EbEVURTVEUTFJd04wcExRazFDUjAxQlN6VlZNUSIsIlRJTUVTVEFNUCI6MTYwNzI0ODU5ODM3Nn0.-KOxN_3On_3kuWTkvvcbsKjRnmBgS6gkpLqKXZNEK7QoQFQVRiMDw0eJ3L-LEQvQNDP8aK1GfTsfCAO_q8qfjg.sbnF4JrkLY8KX61l7J5reg==","Interfaces":[{"ip":"172.24.36.248","mac":"08:f8:bc:72:54:b2","interface":"en0"}]}`)

// params.append('lcaMark', '{"sendTime":"19888:2020-12-6 17:58:40","response":"19888:{\"AgentUuid\":\"VjFfMTAwMDAwMV8yMVRVMDlETE5DQ1IwN0pLQk1CR01BSzVVMQ\",\"LocalUserAccount\":\"didi\",\"LcaSsoToken\":\"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWakZmTVRBd01EQXdNVjh5TVZSVk1EbEVURTVEUTFJd04wcExRazFDUjAxQlN6VlZNUSIsIlRJTUVTVEFNUCI6MTYwNzI0ODU5ODM3Nn0.-KOxN_3On_3kuWTkvvcbsKjRnmBgS6gkpLqKXZNEK7QoQFQVRiMDw0eJ3L-LEQvQNDP8aK1GfTsfCAO_q8qfjg.sbnF4JrkLY8KX61l7J5reg==\",\"Interfaces\":[{\"ip\":\"172.24.36.248\",\"mac\":\"08:f8:bc:72:54:b2\",\"interface\":\"en0\"}]}","TimeOut":""}')
// axios.post('https://me.xiaojukeji.com/user_login', {
//   username: 'huanglihao_i',
//   password: 'OGHsbx%152',
//   deviceid: null,
//   redirect_uri: 'http://mis.diditaxi.com.cn/auth/?app_id=114&jumpto=http://sso.odin.intra.xiaojukeji.com/?callback=http://apim.v2.intra.xiaojukeji.com&callback_index=0',
//   lcainfo: `{"AgentUuid":"VjFfMTAwMDAwMV8yMVRVMDlETE5DQ1IwN0pLQk1CR01BSzVVMQ","LocalUserAccount":"didi","LcaSsoToken":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWakZmTVRBd01EQXdNVjh5TVZSVk1EbEVURTVEUTFJd04wcExRazFDUjAxQlN6VlZNUSIsIlRJTUVTVEFNUCI6MTYwNzI0ODU5ODM3Nn0.-KOxN_3On_3kuWTkvvcbsKjRnmBgS6gkpLqKXZNEK7QoQFQVRiMDw0eJ3L-LEQvQNDP8aK1GfTsfCAO_q8qfjg.sbnF4JrkLY8KX61l7J5reg==","Interfaces":[{"ip":"172.24.36.248","mac":"08:f8:bc:72:54:b2","interface":"en0"}]}`,
//   lcaMark: `{"sendTime":"19888:2020-12-6 17:58:40","response":"19888:{\"AgentUuid\":\"VjFfMTAwMDAwMV8yMVRVMDlETE5DQ1IwN0pLQk1CR01BSzVVMQ\",\"LocalUserAccount\":\"didi\",\"LcaSsoToken\":\"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWakZmTVRBd01EQXdNVjh5TVZSVk1EbEVURTVEUTFJd04wcExRazFDUjAxQlN6VlZNUSIsIlRJTUVTVEFNUCI6MTYwNzI0ODU5ODM3Nn0.-KOxN_3On_3kuWTkvvcbsKjRnmBgS6gkpLqKXZNEK7QoQFQVRiMDw0eJ3L-LEQvQNDP8aK1GfTsfCAO_q8qfjg.sbnF4JrkLY8KX61l7J5reg==\",\"Interfaces\":[{\"ip\":\"172.24.36.248\",\"mac\":\"08:f8:bc:72:54:b2\",\"interface\":\"en0\"}]}","TimeOut":""}`

// }, {
//   headers: {
//   "Content-Type": "multipart/form-data",
//    Accept: 'application/json, text/javascript, */*; q=0.01',
//    'Accept-Encoding': ' gzip, deflate, br',
//     'Accept-Language': 'zh-CN,zh;q=0.9',
//     'Connection': 'keep-alive',
//     'Content-Length': '1557',
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//      Cookie: '_ga=GA1.2.1067239202.1606981520; language=zh_CN',
//      Host: 'me.xiaojukeji.com',
//      Origin: 'https://me.xiaojukeji.com',
//      Referer: `https://me.xiaojukeji.com/project/stargate-auth/html/login.html?redirect_uri=http%3A%2F%2Fmis.diditaxi.com.cn%2Fauth%2F%3Fapp_id%3D114%26jumpto%3Dhttp%3A%2F%2Fsso.odin.intra.xiaojukeji.com%2F%3Fcallback%3Dhttp%3A%2F%2Fapim.v2.intra.xiaojukeji.com%26callback_index%3D0`,
//     'Sec-Fetch-Dest': 'empty',
//     'Sec-Fetch-Mode': 'cors',
//     'Sec-Fetch-Site': 'same-origin',
//     'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
//     'X-Requested-With': 'XMLHttpRequest'
//   }
// })
//   .then(res => console.log(res.headers))



axios({
  method: 'post',
  url: 'https://me.xiaojukeji.com/user_login',
  data: {
    username: 'huanglihao_i',
    password: 'OGHsbx%152',
    deviceid: null,
    redirect_uri: 'http://mis.diditaxi.com.cn/auth/?app_id=114&jumpto=http://sso.odin.intra.xiaojukeji.com/?callback=http://apim.v2.intra.xiaojukeji.com&callback_index=0',
    lcainfo: `{"AgentUuid":"VjFfMTAwMDAwMV8yMVRVMDlETE5DQ1IwN0pLQk1CR01BSzVVMQ","LocalUserAccount":"didi","LcaSsoToken":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWakZmTVRBd01EQXdNVjh5TVZSVk1EbEVURTVEUTFJd04wcExRazFDUjAxQlN6VlZNUSIsIlRJTUVTVEFNUCI6MTYwNzI0ODU5ODM3Nn0.-KOxN_3On_3kuWTkvvcbsKjRnmBgS6gkpLqKXZNEK7QoQFQVRiMDw0eJ3L-LEQvQNDP8aK1GfTsfCAO_q8qfjg.sbnF4JrkLY8KX61l7J5reg==","Interfaces":[{"ip":"172.24.36.248","mac":"08:f8:bc:72:54:b2","interface":"en0"}]}`,
    lcaMark: `{"sendTime":"19888:2020-12-6 17:58:40","response":"19888:{\"AgentUuid\":\"VjFfMTAwMDAwMV8yMVRVMDlETE5DQ1IwN0pLQk1CR01BSzVVMQ\",\"LocalUserAccount\":\"didi\",\"LcaSsoToken\":\"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWakZmTVRBd01EQXdNVjh5TVZSVk1EbEVURTVEUTFJd04wcExRazFDUjAxQlN6VlZNUSIsIlRJTUVTVEFNUCI6MTYwNzI0ODU5ODM3Nn0.-KOxN_3On_3kuWTkvvcbsKjRnmBgS6gkpLqKXZNEK7QoQFQVRiMDw0eJ3L-LEQvQNDP8aK1GfTsfCAO_q8qfjg.sbnF4JrkLY8KX61l7J5reg==\",\"Interfaces\":[{\"ip\":\"172.24.36.248\",\"mac\":\"08:f8:bc:72:54:b2\",\"interface\":\"en0\"}]}","TimeOut":""}`
  },
  transformRequest: [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substring(0, ret.lastIndexOf('&'));
      console.log(ret);
      return ret
    }
  ],
  headers: {
    // "Content-Type": "multipart/form-data",
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': ' gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Content-Length': '1557',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Cookie: '_ga=GA1.2.1067239202.1606981520; language=zh_CN',
    Host: 'me.xiaojukeji.com',
    Origin: 'https://me.xiaojukeji.com',
    Referer: `https://me.xiaojukeji.com/project/stargate-auth/html/login.html?redirect_uri=http%3A%2F%2Fmis.diditaxi.com.cn%2Fauth%2F%3Fapp_id%3D114%26jumpto%3Dhttp%3A%2F%2Fsso.odin.intra.xiaojukeji.com%2F%3Fcallback%3Dhttp%3A%2F%2Fapim.v2.intra.xiaojukeji.com%26callback_index%3D0`,
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
  }
}).then(res => {
  console.log(res.headers);
})


