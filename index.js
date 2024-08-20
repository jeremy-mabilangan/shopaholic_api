const express = require("express");
// const path = require("path");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();
const productRoutes = require("./routes/product");

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));

// Init product APIs route
app.use("/product", productRoutes);

mongoConnect(() => {
  app.listen(3000);
});
