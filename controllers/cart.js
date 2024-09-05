const Cart = require("../models/cart");
const Product = require("../models/product");

/**
 * Controller for add to cart.
 */
exports.postCart = (req, res) => {
  const productId = req.body.product_id;
  const userId = req.body.user_id;
  const cart = new Cart(userId);

  Product.getById(productId)
    .then((product) => {
      cart
        .addToCart(product._id)
        .then(() => {
          res.json({ status: 200, message: "Added To Cart Successfully" });
        })
        .catch(() => {
          res.json({ status: 400 });
        });
    })
    .catch(() => {
      res.json({ status: 400, message: "Product does not exist." });
    });
};
