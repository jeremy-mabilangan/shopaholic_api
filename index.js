const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");

app.use(bodyParser.json());

// Init product APIs route
app.use("/product", productRoutes);
// Init user APIs route
app.use("/user", userRoutes);
// Init cart APIs route
app.use("/cart", cartRoutes);

mongoConnect(() => {
  app.listen(3000);
});
