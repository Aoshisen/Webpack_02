const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router.get('/getUser', async ctx => {
    ctx.body = "这是我创建的页面";
});

app.use(router.routes());


app.listen(9999);