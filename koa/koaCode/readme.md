koa 原理

koa总共就4个文件夹，request，response，context，appliaction

其中 request，response，context 就是使用get，set代理一下，
比如代理ctx 然后ctx.url 拿到ctx.req.url,ctx.body 拿到ctx.reqsponse.body,取值同理


application 首先包装一下http创建一个服务器,然后就是通过Object.create方法,这样就可以拿到父对象的属性然后修改还不会影响到父亲,就是一个简单的原型操作,再然后进行交叉赋值,主要就是为了方便拿值然后将request,response 聚合在context上

最重要的就是中间件,中间件的作用.

1:统一拦截

2:扩展属性

3.分割逻辑,基于中间键做插件

所以use方法都会被promise包装,内部next必须加await 或者return


中间键原理 

很简单,首先入栈,然后执行的时候,用promise包装一下,调用next方法的时候执行下一个.
