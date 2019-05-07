const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const staticRouter = require('./routers/static.js')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(ctx.path)
    await next()
  } catch (e) {
    console.log(e)
    ctx.status = 500
    if(isDev) {
      ctx.body = e.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if(ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter = null
if(isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

app.listen(PORT, HOST, () => {
  console.log(`server is listenning ${HOST}: ${PORT}`)
})
