const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const api_route = require("./routes/stats.js");

// X-response-time
app.use(async function(ctx, next) {
 const start = new Date();
 await next();
 const ms = new Date() - start;
 ctx.set("X-Response-Time", `${ms}ms`);
});

// logger
app.use(async function(ctx, next) {
 const start = new Date();
 await next();
 const ms = new Date() - start;
 console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(cors());
app.use(helmet());
app.use(bodyParser());
app.use(api_route.routes());
app.use(api_route.allowedMethods());
app.listen(3000);
