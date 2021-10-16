const Router = require("@koa/router");
const router = new Router();

// TODO: Add all the other routes
router.get("/users/", async (ctx, next) => {
 ctx.body = {
  message: "No Users Yet",
 };
 await next();
});

module.exports = router;
