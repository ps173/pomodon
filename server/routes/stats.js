const Router = require("@koa/router");
const router = new Router();
const userStats = require("../models/UserStats");

// // TODO: Extract the get by id as a middleware
// TODO: Add all the other id methods
router.get("/stats/", async (ctx, next) => {
  const allStats = await userStats.find();
  ctx.body = allStats;
  await next();
});

router.get("/stats/:user", getStatsByUserId, async (ctx, next) => {
  ctx.body = ctx.request.userStats;
  await next();
});

router.post("/stats/", async (ctx, next) => {
  let stats;
  try {
    stats = new userStats({
      userID: ctx.request.body?.userID,
      displayName: ctx.request.body?.displayName,
      totalNumberOfSession: ctx.request.body?.totalNumberOfSession,
      totalHours: ctx.request.body?.totalHours,
    });
    await stats.save();
  } catch (err) {
    console.error(err);
    stats = "Some error occured" + err;
  }
  ctx.body = stats;
  await next();
});

router.put("/stats/:user", getStatsByUserId, async (ctx, next) => {
  ctx.body = {
    message: `Update stats of user - ${ctx.params.user}`,
  };
  await next();
});

router.delete("/stats/", async (ctx, next) => {
  ctx.body = {
    message: `deleted user stats`,
  };
  await next();
});

router.delete("/stats/:user", async (ctx, next) => {
  ctx.body = {
    message: `deleted stats of user - ${ctx.params.user}`,
  };
  await next();
});

async function getStatsByUserId(ctx, next) {
  let stats;
  try {
    stats = await userStats.findById(ctx.params.user);
  } catch (err) {
    console.error(err);
    stats = "user does not exists";
  }
  ctx.request.userStats = stats;
  await next();
}

module.exports = router;
