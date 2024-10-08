import { Router } from "express";
import {
  createUserSchema,
  loginUserSchema,
  addToCartSchema,
} from "../middleware/validators/users.validation.js";
import validateRequestSchema from "../middleware/validate-request-schema.js";
import isAuth from "../middleware/is-auth.js";
import isUser from "../middleware/is-user.js";
import UserController from "../controllers/users.controller.js";
import UsersRepoImpl from "../../data/repositories/mongodb/usersRepoImpl.js";

const controller = new UserController(new UsersRepoImpl());

const router = Router();

/**
 * Create user
 *
 * /users => POST method
 */
router
  .route("/")
  .post(createUserSchema, validateRequestSchema, controller.createUser);

/**
 * Login user
 *
 * /users/login => POST method
 */
router
  .route("/login")
  .post(loginUserSchema, validateRequestSchema, controller.loginUser);

/**
 * Add to cart
 *
 * /users/cart => POST method
 */
router
  .route("/cart")
  .post(
    isAuth,
    isUser,
    addToCartSchema,
    validateRequestSchema,
    controller.updateCart
  );

/**
 * Add to cart
 *
 * /users/cart => GET method
 */
router.route("/cart").get(isAuth, isUser, controller.getCart);

/**
 * Get user by user id
 *
 * /users => GET method
 */
router.route("/").get(isAuth, controller.getUserById);

export default router;
