const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const cors = require("koa-cors");
const Router = require("koa-router");
const app = new Koa();

app.use(cors()).use(bodyparser());

const router = new Router();

router.get("/log/report", (ctx, next) => {
    const query = ctx.request.query;
    ctx.body = {
        code: 200,
        msg: "success",
        data: query,
    };
});

router.post("/log/report", (ctx, next) => {
    const params = ctx.request.body;
    ctx.body = {
        code: 200,
        msg: "success",
        data: params,
    };
});

app.use(router.routes()).use(router.allowedMethods());

const port = 1546;
app.listen(port);
console.log(`app run at ${port}`);
