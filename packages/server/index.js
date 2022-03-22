const Koa = require('koa');
const bodyparser = require('koa-bodyparser')
const cors = require('koa-cors')
const app = new Koa();

app.use(cors()).use(bodyparser())
// response
app.use(ctx => {
  // todo save request.body
  ctx.body = {
    code: 200,
    msg: 'success',
  };
});

const port = 1546
app.listen(port);

console.log(`app run at ${port}`)

