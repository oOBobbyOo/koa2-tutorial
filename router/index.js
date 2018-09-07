const router = require('koa-router')()

module.exports = app => {
  router.get('/', app.controller.home.index)

  router.get('/login', app.controller.login.index)
  router.post('/register', app.controller.login.register)

  router.get('/user', app.controller.user.index)
  router.get('/user/:id', app.controller.user.userParmas)

  // 调用路由中间件
  app.use(router.routes()).use(router.allowedMethods())
}
