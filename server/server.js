const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const api_route = require("./routes/stats.js");
const morgan = require("koa-morgan");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_HOST);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected To Database"));

app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.use(bodyParser());
app.use(api_route.routes());
app.use(api_route.allowedMethods());
app.listen(3000);
