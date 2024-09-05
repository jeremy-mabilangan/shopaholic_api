const express = require("express");
const router = express.Router();

const CartControllers = require("../controllers/cart");

/**
 * Add to cart
 *
 * /cart => POST method
 */
router.post("/", CartControllers.postCart);

module.exports = router;
