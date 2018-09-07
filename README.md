# koa2-tutorial

## koa2 目录结构分析

```js
├── lib
│ ├── application.js
│ ├── context.js
│ ├── request.js
│ └── response.js
└── package.json
```

application.js 是整个 koa2 的入口文件，封装了 context，request，response，以及最核心的中间件处理流程。
context.js 处理应用上下文，里面直接封装部分 request.js 和 response.js 的方法
request.js 处理 http 请求
response.js 处理 http 响应

## Koa2 中 Cookie 的使用

```js
// 设置Cookie的值
ctx.cookies.set(name, value, [options])

// 获取Cookie的值
ctx.cookies.get('name')
```

## Koa2 中设置全局变量可以通过 ctx.state.变量名 如下：

```js
router.use(async (ctx, next) => {
  //全局的G变量
  ctx.state.G = {
    username: ctx.session.username
  }
})
```

## koa2 中实现 301 重定向和 302 重定向，只需要通过设置 ctx.status; 然后通过 ctx.redirect('/cart');进行跳转

```js
// koa2 301重定向代码：
ctx.status = 301
ctx.redirect('/cart')

// 302重定向代码：
ctx.status = 302
ctx.redirect('/cart')
```
