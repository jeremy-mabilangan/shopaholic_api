const User = require("../models/users");

/**
 * Controller for adding a user.
 */
exports.postUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const user = new User({ name, email });

  user
    .save()
    .then(() => {
      res.json({ status: 200, message: "Added User Successfully" });
    })
    .catch(() => {
      res.json({ status: 400, message: "Failed to add user" });
    });
};

/**
 * Controller for fetching user using user id.
 */
exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.send({ status: 200, user });
    })
    .catch(() => {
      res.send({ status: 400 });
    });
};

/**
 * Controller for add to cart.
 */
exports.postCart = (req, res) => {
  const productId = req.body.product_id;
  const userId = req.body.user_id;
  const quantity = req.body.quantity ?? null;

  User.updateCart(productId, userId, quantity)
    .then(() => {
      res.json({ status: 200, message: "Cart updated successfully" });
    })
    .catch(() => {
      res.json({ status: 400, message: "Something went wrong" });
    });
};

/**
 * Controller for get cart.
 */
exports.getCart = (req, res) => {
  const userId = req.body.user_id;

  User.fetchCart(userId)
    .then((result) => {
      res.json({ status: 200, cart: result.cart });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 400, message: "Something went wrong" });
    });
};
