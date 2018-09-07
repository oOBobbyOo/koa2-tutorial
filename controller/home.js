module.exports = {
  index: async (ctx, next) => {
    await ctx.render('index', {
      title: 'home'
    })
  }
}
