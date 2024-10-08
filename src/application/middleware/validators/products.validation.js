import { body, param } from "express-validator";
import Products from "../../../data/models/products.model.js";

/**
 * Add product
 */
const addProductSchema = [
  /**
   * Check if string.
   * Minimum 2 characters.
   */
  body("name")
    .isString()
    .withMessage("Please enter a valid product name.")
    .isLength({ min: 2 })
    .withMessage("Atleast minimum 2 characters.")
    .trim(),
  /**
   * Check if valid image url.
   */
  body("imageUrl").isURL().withMessage("Please enter a valid image URL."),
  /**
   * Check if it is a valid price.
   */
  body("price").isFloat().withMessage("Please enter a valid price."),
  /**
   * Check if string.
   * Minimum 5 characters.
   * Maximum 400 characters.
   */
  body("description")
    .isString()
    .withMessage("Please enter a valid product description.")
    .isLength({ min: 5, max: 400 })
    .withMessage("Atleast minimum 5 characters and maximum 400 characters.")
    .trim(),
];

/**
 * Edit product
 */
const editProductSchema = [
  param("productId")
    .isString()
    .withMessage("Please enter a valid product id.")
    .custom(async (value) => {
      const product = await Products.findOne({ _id: value });
      if (!product) return Promise.reject("Product not found");
    }),
  ...addProductSchema, // Use the schema of add product
];

export { addProductSchema, editProductSchema };
