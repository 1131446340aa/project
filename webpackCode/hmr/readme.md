## 原理

1. 启动hotModuleReplaceElementPlugin

2. 用express启动一个http服务器

3. 往entry注入代码

4. 启动webpack Dev Middleware 中间件,主要是触发done钩子执行comlier的watch方法

4. 创建websocket服务器,监听hash,ok并发送

5. 监听done 钩子,当文件发生变化时,会触发watch方法,每次编译完毕都会生成hash,js文件,json,然后触发webpack-dev-server钩子,重新发送一次hash

6. 客服端对比hash是否相同,不同则发送ajax,jsonp请求,获取最新的js代码

7. 使用文件系统去替换修改部分实现局部刷新


