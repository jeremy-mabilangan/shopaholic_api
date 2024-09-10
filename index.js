const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database").mongoConnect;

// const User = require("./models/user");

const app = express();
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   User.getById("66c4508af629623d0dc7ea78")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   next();
// });

// Init product APIs route
app.use("/product", productRoutes);
// Init user APIs route
app.use("/user", userRoutes);
// Init cart APIs route
app.use("/cart", cartRoutes);

mongoConnect(() => {
  app.listen(3000);
});
