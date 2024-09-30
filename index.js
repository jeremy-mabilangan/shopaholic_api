const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

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
  .connect(
    "mongodb+srv://admin:lDC33kNMThkUqhXC@shopaholic.hqb68.mongodb.net/shopaholicdb?retryWrites=true&w=majority&appName=Shopaholic"
  )
  .then(() => {
    console.log("Connected to mongodb!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("mongoose connect error => ", err);
  });
