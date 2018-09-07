const path = require('path')
const ip = require('ip')
const cors = require('koa2-cors')
const jsonp = require('koa-jsonp')
const session = require('koa-session')
const staticFiles = require('koa-static')
const bodyParser = require('koa-bodyparser')
const render = require('koa-art-template')

const miHttpError = require('./mi-http-error')
const miLog = require('./mi-log')
const miSend = require('./mi-send')
const miRule = require('./mi-rule')

const CONFIG = {
  keys: 'koa:sess', //cookie key (default is koa:sess)
  maxAge: '86400000', // cookie有效时长
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  signed: true, // 签名 默认为true
  httpOnly: true, // 是否只有服务端访问 默认为true
  overwrite: true // 是否允许重写 默认为true
}

module.exports = app => {
  // 允许跨域
  app.use(cors())

  // jsonp
  // app.use(jsonp())

  // 错误
  app.use(
    miHttpError({
      errorPageFolder: path.resolve(__dirname, '../views/error')
    })
  )

  // 日志
  app.use(
    miLog({
      env: app.env, // koa 提供的环境变量
      projectName: 'koa2-tutorial', // 项目名，记录在日志中的项目信息
      appLogLevel: 'debug', // 指定记录的日志级别
      dir: 'logs', // 指定日志存放的目录名
      serverIp: ip.address() // 指定服务器 ip 地址
    })
  )

  // 设置签名的 Cookie 密钥
  app.keys = ['bobby']
  // session
  app.use(session(CONFIG, app))

  // 静态资源
  app.use(staticFiles(path.resolve(__dirname, '../assets')))

  //配置koa-art-template模板引擎
  render(app, {
    root: path.resolve(__dirname, '../views'), // 视图的位置
    extname: '.art', // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
  })

  app.use(bodyParser())

  app.use(miSend())

  miRule({
    app,
    rules: [
      {
        path: path.resolve(__dirname, '../controller'),
        name: 'controller'
      },
      {
        path: path.resolve(__dirname, '../api'),
        name: 'api'
      }
    ]
  })

  // 错误的监听处理
  app.on('error', async (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}
