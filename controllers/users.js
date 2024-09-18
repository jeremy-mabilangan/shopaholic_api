const User = require("../models/users");

/**
 * Controller for creating user.
 */
exports.postUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user = new User({ name, email, password });

  user
    .createUser()
    .then(() => {
      res.json({ status: 201, message: "Added User Successfully" });
    })
    .catch(() => {
      res.json({ status: 400, message: "Failed to add user" });
    });
};

/**
 * Controller for logging-in user.
 */
exports.postLoginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.loginUser(email, password)
    .then((result) => {
      if (result.status === false) {
        res.json({ status: 400, message: result.message });
      } else {
        res.json({ status: 200, ...result._doc });
      }
    })
    .catch(() => {
      res.json({ status: 400, message: "Failed to login" });
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
      res.json({ status: 400, message: "Something went wrong" });
    });
};
