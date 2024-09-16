const express = require("express");
const router = express.Router();

const UsersControllers = require("../controllers/users");

/**
 * Create user
 *
 * /users => POST method
 */
router.post("/", UsersControllers.postUser);

/**
 * Login user
 *
 * /users/login => POST method
 */
router.post("/login", UsersControllers.postLoginUser);

/**
 * Add to cart
 *
 * /users/cart => POST method
 */
router.post("/cart", UsersControllers.postCart);

/**
 * Add to cart
 *
 * /users/cart => GET method
 */
router.get("/cart", UsersControllers.getCart);

/**
 * Get user by user id
 *
 * /users/:userId => GET method
 */
router.get("/:userId", UsersControllers.getUserById);

module.exports = router;
