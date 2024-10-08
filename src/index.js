import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import helmet from "helmet";
import routes from "./application/routes/index.js";
import config from "./core/utils/config.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Init all routes
app.use(routes);

connect(config.MONGODB_URL)
  .then(() => {
    console.log("Connected to mongodb!");
    app.listen(config.PORT);
  })
  .catch((err) => {
    console.log("mongoose connect error => ", err);
  });
