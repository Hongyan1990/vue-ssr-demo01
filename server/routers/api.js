const Router = require('koa-router')

const apiRouter = new Router({prefix: '/api'})
const successRespons = (data) => {
  return {
    success: true,
    data
  }
}
apiRouter
  .get('/todo', async ctx => {
    const data = await ctx.db.getAllTodos()
    ctx.body = successRespons(data)
  })
  .post('/todo', async ctx => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successRespons(data)
  })
  .put('/todo/:id', async ctx => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successRespons(data)
  })
  .delete('/todo/:id', async ctx => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successRespons(data)
  })
  .post('/delete/completed', async ctx => {
    console.log('------------------2-----------------')
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successRespons(data)
  })

module.exports = apiRouter
