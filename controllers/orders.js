const Order = require("../models/orders");

/**
 * Controller for saving an order.
 */
exports.postOrder = (req, res) => {
  const userId = req.body.user_id;

  Order.createOrder(userId)
    .then((result) => {
      if (!result.status) {
        res.json({ status: 400, message: result.message });
      } else {
        res.json({ status: 200, message: "Order Created!" });
      }
    })
    .catch(() => {
      res.json({ status: 400, message: "Failed to create an order" });
    });
};
