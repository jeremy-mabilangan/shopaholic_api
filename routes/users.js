const express = require("express");
const router = express.Router();

const UsersControllers = require("../controllers/users");

/**
 * Save user
 *
 * /user => POST method
 */
router.post("/", UsersControllers.postUser);

/**
 * Add to cart
 *
 * /user/cart => POST method
 */
router.post("/cart", UsersControllers.postCart);

/**
 * Add to cart
 *
 * /user/cart => GET method
 */
router.get("/cart", UsersControllers.getCart);

/**
 * Get user by user id
 *
 * /user/:userId => GET method
 */
router.get("/:userId", UsersControllers.getUserById);

module.exports = router;
