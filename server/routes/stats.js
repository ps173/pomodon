const Router = require("@koa/router");
const router = new Router();
const userStats = require("../models/UserStats");

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

// FIXME: REFACTOR THIS
router.put("/stats/:user", getStatsByUserId, async (ctx, next) => {
  ctx.request.userStats.userID = ctx.request.body?.userID;
  ctx.request.userStats.displayName = ctx.request.body?.displayName;
  ctx.request.userStats.totalNumberOfSession =
    ctx.request.body?.totalNumberOfSession;
  ctx.request.userStats.totalHours = ctx.request.body?.totalHours;
  try {
    const updatedStats = await ctx.request.userStats.save();
    ctx.response.body = updatedStats;
  } catch (err) {
    console.error(err);
  }
  await next();
});

router.delete("/stats/", async (ctx, next) => {
  ctx.body = {
    message: `deleted all user stats`,
  };
  userStats.delte;
  await next();
});

// FIXME: GIVES 404 status code and not found in return but still deletes the user
router.delete("/stats/:user", async (ctx, next) => {
  userStats.findByIdAndDelete(ctx.params.user, (err, docs) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log("Delted : ", docs);
    ctx.body = {
      message: `deleted : ${docs}`,
    };
    ctx.status = 204;
  });
  await next();
});

// DOCS: Middleware for getting users by id
async function getStatsByUserId(ctx, next) {
  let stats;
  try {
    stats = await userStats.findById(ctx.params.user);
  } catch (err) {
    console.error(err);
  }
  ctx.request.userStats = stats;
  await next();
}

module.exports = router;
