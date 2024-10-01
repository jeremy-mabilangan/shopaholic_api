const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");

const mongoose = require("mongoose");

const app = express();
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

env.config();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Init product APIs route
app.use("/products", productRoutes);
// Init user APIs route
app.use("/users", userRoutes);
// Init orders APIs route
app.use("/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb!");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log("mongoose connect error => ", err);
  });
