const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('koa-cors')

const mongoose = require('mongoose')

const router = require('./router')

const app = new Koa()

app.use(cors())
app.use(bodyparser())

app.use(router.routes()).use(router.allowedMethods())

async function init() {
  await mongoose.connect('mongodb://database/test')

  const port = 1546
  app.listen(port, '0.0.0.0')
  console.log(`app run at ${port}`)
}

init()
