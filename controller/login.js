module.exports = {
  index: async (ctx, next) => {
    console.log(ctx.request.query)
    await ctx.render('login')
  },
  register: async (ctx, next) => {
    const { app } = ctx
    let { name, password } = ctx.request.body
    let res = await app.api.login.register(name, password)

    // cookie
    ctx.cookies.set('user', name, {
      domain: 'localhost', // 写cookie所在的域名
      path: '/', // 写cookie所在的路径
      maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
      expires: new Date('2018-09-08'), // cookie失效时间
      httpOnly: true, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    })

    // session
    ctx.session.username = name

    if (res.status == '-1') {
      await ctx.render('login', res.data)
    } else {
      ctx.state.title = '个人中心'
      await ctx.render('user', res.data)
    }
  }
}
