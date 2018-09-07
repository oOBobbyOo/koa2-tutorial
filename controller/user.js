module.exports = {
  index: async (ctx, next) => {
    await ctx.render('user')
  },
  userParmas: async (ctx, next) => {
    console.log(ctx.params)
    let id = ctx.params.id

    // cookie
    let user = ctx.cookies.get('user')
    // session
    let username = ctx.session.username

    await ctx.render('userParmas', { id, user, username })
  }
}
