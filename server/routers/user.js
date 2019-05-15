const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if(user.username === 'hongyan' && user.password === 'hongyan111') {
    ctx.session.user = {
      username: 'hongyan'
    }
    ctx.body = {
      success : true,
      data: {
        username: 'hongyan'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
