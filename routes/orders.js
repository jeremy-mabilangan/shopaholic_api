const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const isUser = require("../middleware/is-user");

const OrdersControllers = require("../controllers/orders");

/**
 * Create order
 *
 * /orders => POST method
 */
router.post("/", isAuth, isUser, OrdersControllers.postOrder);

/**
 * Get s
 *
 * /orders => GET method
 */
router.get("/", isAuth, OrdersControllers.getOrder);

module.exports = router;
