const express = require("express");
const router = express.Router();
const {
  createUserSchema,
  loginUserSchema,
  addToCartSchema,
} = require("../schema/user-schema");

const validateRequestSchema = require("../middleware/validate-request-schema");
const isAuth = require("../middleware/is-auth");
const isUser = require("../middleware/is-user");

const UsersControllers = require("../controllers/users");

/**
 * Create user
 *
 * /users => POST method
 */
router.post(
  "/",
  createUserSchema,
  validateRequestSchema,
  UsersControllers.postUser
);

/**
 * Login user
 *
 * /users/login => POST method
 */
router.post(
  "/login",
  loginUserSchema,
  validateRequestSchema,
  UsersControllers.postLoginUser
);

/**
 * Add to cart
 *
 * /users/cart => POST method
 */
router.post(
  "/cart",
  isAuth,
  isUser,
  addToCartSchema,
  validateRequestSchema,
  UsersControllers.postCart
);

/**
 * Add to cart
 *
 * /users/cart => GET method
 */
router.get("/cart", isAuth, isUser, UsersControllers.getCart);

/**
 * Get user by user id
 *
 * /users => GET method
 */
router.get("/", isAuth, isUser, UsersControllers.getUserById);

module.exports = router;
