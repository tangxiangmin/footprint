const Router = require("koa-router");
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

module.exports = router;
