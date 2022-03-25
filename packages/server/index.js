const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const cors = require("koa-cors");

const router = require("./router");

const app = new Koa();

app.use(cors()).use(bodyparser());

app.use(router.routes()).use(router.allowedMethods());

const port = 1546;
app.listen(port);

console.log(`app run at ${port}`);
