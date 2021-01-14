# webpack

## 一: 配置

模块打包机,本身只能打包js.通过loader处理可以打包其他模块

webpack 配置只是一个对象参数.

这个对象有以下属性

entry: 入口目录,可以配置一个或者多个,

output: 出口目录

plugin : 插件,监听webpack的声明周期,然后做一些额外的操作,

本质就是一个class,然后在一些同步或者异步hooks订阅一些事件,当webpack执行到一定时机去发布这些事件

chunk:代码块,用于代码分割和合并

Loader:翻译官,配置在module的test当中,本质就是一个函数,函数入参是源代码,返回值是经过翻译后的代码,webpack内部提供了util工具包去操作它,loader遵循单一原则,一个loader只做一件事.loader有字符串,对象数组三种形式,遵守从后到前,从右到左执行顺序,可以进行配置顺序

context: 设置项目根目录,默认当前目录

devserver:配置开发服务器  

mode:模式

devtool: 代码调试

reslove: 配置别名,后缀名

## 二:优化

1.purgecss 去除未使用css

2.压缩代码,减小代码体积

2.dll 生成动态库,wp5貌似可以不配置,wp5可以使用缓存

3.多进行处理

4.cdn 

5.tree shanking 

6.代码分割:配置多入口和动态import 提取公共代码 

7.HMR


## 三.流程

1.检查配置是否合法

2.合并参数

3.声明complier对象

简单说一下complier对象,主要就是在hooks对象中构建一些钩子,这些钩子都是同步或者异步的发布订阅,当编写一个插件的时候,订阅一下这些钩子.complier还有一些方法,大多是在构建过程发布或者订阅一些钩子

4.给complier加上读写功能

5.遍历执行plugin进行挂载.

6.注册一些初始化或者触发一些初始化的事件,最关键的是注册make事件,make事件主要是用来添加入口的.

7.执行complier的run方法,基本大部分方法都会发布和订阅一些钩子以后就不说了,主要是去执行complier方法,complier对象主要是去声明complation对象和发布make事件

8.complation 的主要功能是来构建模块和代码块,和complier一样也有一些乱七八糟的钩子,在触发make的回调后开始正式执行complation的方法,主要就是利用complier的读功能拿到源代码,将其转化为ast,遍历ast找到其中的require和import,对其引用的模块加一个模块id,模块id就是经过转化后相对根目录的相对路径,在这里顺便确认一下入口目录,然后对某些ast进行修改,产生新的代码.然后递归执行.这里会得到一个包含入口文件和依赖文件的chunk.


9.在make执行完毕后出发回调,执行emit钩子,这个时候要进行文件进行写操作,将chunk转化为代码,是最后修改文件的时候






# TapAble

# 1.Sync

## syncHook

简单的同步 发布订阅 tap订阅，call发布


## syncBailHook

函数return 非 undefined  则停止

用循环代替以前的forEach；


## syncWaterfallHook

将多个hook链接起来，将上一个hook的返回值返回给下一个


## syncLoopHook

将一个hook多次执行



# 2. Async

## AsyncParralleHook

异步并行方法  tapASync callAsync 异步 tapPromise Promise 注册

## Async SeriesHook


异步串行



