import { body } from "express-validator";
import User from "../../../data/models/users.model.js";

/**
 * Create user
 */
const createUserSchema = [
  /**
   * Email is required.
   * Check if email is valid.
   * Check if email already exist.
   */
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) return Promise.reject("Email is already exists.");
    })
    .normalizeEmail(),
  /**
   * Password is required.
   * Minimum 6 characters
   */
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password is at least 6 characters.")
    .trim(),

  /**
   * Confirm password is required.
   * Must match to password.
   */
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }

      return true;
    })
    .trim(),
];

/**
 * Login user
 */
const loginUserSchema = [
  /**
   * Email is required.
   * Check if email is valid.
   */
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  /**
   * Password is required.
   * Minimum 6 characters
   */
  body("password")
    .isLength({ min: 6 })
    .withMessage("Please enter a valid password.")
    .trim(),
];

/**
 * Add to cart
 */
const addToCartSchema = [
  body("product_id")
    .isLength({ min: 1 })
    .withMessage("Please enter a valid product id."),
  body("quantity")
    .optional()
    .isInt()
    .withMessage("Please enter a valid quantity."),
];

export { createUserSchema, loginUserSchema, addToCartSchema };
