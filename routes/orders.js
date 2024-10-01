const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");

const OrdersControllers = require("../controllers/orders");

/**
 * Create order
 *
 * /orders => POST method
 */
router.post("/", isAuth, OrdersControllers.postOrder);

/**
 * Create order
 *
 * /orders => GET method
 */
router.get("/", isAuth, OrdersControllers.getOrder);

module.exports = router;
