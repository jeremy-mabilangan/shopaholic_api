const Order = require("../models/orders");
const { USER_ROLES } = require("../util/enum");

/**
 * Controller for saving an order.
 */
exports.postOrder = (req, res) => {
  const userId = req.userId;

  Order.createOrder(userId)
    .then((result) => {
      if (result.status === false) {
        res.json({ status: 400, message: result.message });
      } else {
        res.json({ status: 201, message: "Order Created!" });
      }
    })
    .catch(() => {
      res.json({ status: 400, message: "Failed to create an order" });
    });
};

/**
 * Controller for fetch order.
 */
exports.getOrder = (req, res) => {
  let fn;
  const userId = req.userId;

  if (req.role === USER_ROLES.R1) {
    // Admin
    // Get all orders
    fn = Order.find();
  } else {
    // User
    // Get orders by user
    fn = Order.find({ user_id: userId });
  }

  fn.then((result) => {
    res.json({ status: 200, result: result || [] });
  }).catch(() => {
    res.json({ status: 400, message: "Failed to get order." });
  });
};
