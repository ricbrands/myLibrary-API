import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsHandler from "./controllers/middlewares/errorsHandler.js";
import handler404 from "./controllers/middlewares/handler404.js";

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Connect sucessfully with mongoDB");
});
const app = express();
app.use(express.json());
routes(app);

app.use(handler404);


app.use(errorsHandler);

export default app;