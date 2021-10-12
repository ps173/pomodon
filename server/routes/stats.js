const Router = require("@koa/router");
const router = new Router();

// get all
router.get("/stats/", async (ctx, next) => {
 ctx.body = {
  message: `Get everyone's stats`,
 };
 await next();
});

// get one
router.get("/stats/:user", async (ctx, next) => {
 ctx.body = {
  message: `Get stats of user - ${ctx.params.user} `,
 };
 await next();
});

// post
router.post("/stats/", async (ctx, next) => {
 ctx.body = {
  message: `Stats of new user posted`,
 };
 await next();
});

// put a item
router.put("/stats/:user", async (ctx, next) => {
 ctx.body = {
  message: `Update stats of user - ${ctx.params.user}`,
 };
 await next();
});

// delete all
router.delete("/stats/", async (ctx, next) => {
 ctx.body = {
  message: `deleted user stats`,
 };
 await next();
});

// delete one
router.delete("/stats/:user", async (ctx, next) => {
 ctx.body = {
  message: `deleted stats of user - ${ctx.params.user}`,
 };
 await next();
});

module.exports = router;
