const Order = require("../models/orders");

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
  const userId = req.userId;

  Order.find({ user_id: userId })
    .then((result) => {
      res.json({ status: 200, result: result || [] });
    })
    .catch(() => {
      res.json({ status: 400, message: "Failed to get order." });
    });
};
