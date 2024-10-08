import { body } from "express-validator";
import { STATUSES } from "../../../core/utils/constant.js";

/**
 * Create order
 */
const createOrderSchema = [
  /**
   * Validate cart array
   */
  body("cart")
    .isArray({ min: 1 })
    .withMessage("Please enter a valid cart items."),
  body("cart.*.product_id")
    .isString()
    .withMessage("Please enter a valid product id."),
  body("cart.*.name").isString().withMessage("Please enter a valid name."),
  body("cart.*.price").isInt().withMessage("Please enter a valid price."),
  body("cart.*.description")
    .isString()
    .withMessage("Please enter a valid description."),
  body("cart.*.imageUrl")
    .isString()
    .withMessage("Please enter a valid image url."),
  body("cart.*.quantity").isInt().withMessage("Please enter a valid quantity."),
];

const updateOrderStatusSchema = [
  body("status")
    .isString()
    .withMessage("Please enter status.")
    .isIn(STATUSES)
    .withMessage("Status is invalid."),
];

export { createOrderSchema, updateOrderStatusSchema };
