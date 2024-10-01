const { body, param } = require("express-validator");

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
    .withMessage("Atleast minimum 2 characters")
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
    .withMessage("Atleast minimum 5 characters and maximum 400 characters")
    .trim(),
];

/**
 * Edit product
 */
const editProductSchema = [
  //   param("productId")
  //     .exists()
  //     .withMessage(":productId should not be empty")
  //     .trim(),
  ...addProductSchema, // Use the schema of add product
];

exports.addProductSchema = addProductSchema;
exports.editProductSchema = editProductSchema;
