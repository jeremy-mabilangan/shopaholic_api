const Cart = require("../models/cart");

/**
 * Controller for add to cart.
 */
exports.postCart = (req, res) => {
  const productId = req.body.product_id;
  const userId = req.body.user_id;
  const cart = new Cart(userId);

  cart
    .addToCart(productId)
    .then(() => {
      res.json({ status: 200, message: "Added to cart successfully" });
    })
    .catch(() => {
      res.json({ status: 400, message: "Something went wrong" });
    });
};
