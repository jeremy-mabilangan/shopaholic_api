const express = require("express");
const router = express.Router();

const OrdersControllers = require("../controllers/orders");

/**
 * Create order
 *
 * /orders => POST method
 */
router.post("/", OrdersControllers.postOrder);

module.exports = router;
