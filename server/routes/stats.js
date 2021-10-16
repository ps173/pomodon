const Router = require("@koa/router");
const router = new Router();
const userStats = require("../models/UserStats");

// TODO: Extract the functionality

// get all
router.get("/stats/", async (ctx, next) => {
  const allStats = await userStats.find();
  ctx.body = allStats;
  await next();
});

// get one
router.get("/stats/:user", async (ctx, next) => {
  let response;
  try {
    response = await userStats.findById(ctx.params.user);
  } catch (err) {
    console.error(err);
    response = "user does not exists";
  }
  ctx.body = response;
  await next();
});

// post to the route
router.post("/stats/", async (ctx, next) => {
  let stats;
  try {
    stats = new userStats({
      user: ctx.request.body?.user,
      totalTime: ctx.request.body?.totalTime,
    });
    await stats.save();
  } catch (err) {
    console.error(err);
    stats = "Some error occured" + err;
  }
  ctx.body = stats;
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
