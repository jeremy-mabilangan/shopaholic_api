const express = require("express");
const router = express.Router();
const {
  addProductSchema,
  editProductSchema,
} = require("../schema/product-schema");
const validateRequestSchema = require("../middleware/validate-request-schema");

const ProductsControllers = require("../controllers/products");

/**
 * Save product
 * /products => POST method
 */
router.post(
  "/",
  addProductSchema,
  validateRequestSchema,
  ProductsControllers.postProduct
);

/**
 * Get all products
 * /products => GET method
 */
router.get("/", ProductsControllers.getProducts);

/**
 * Get product by product id
 * /products/:productId => GET method
 */
router.get("/:productId", ProductsControllers.getProductById);

/**
 * Edit product by product id
 * /products/edit/:productId => POST method
 */
router.post(
  "/edit/:productId",
  editProductSchema,
  validateRequestSchema,
  ProductsControllers.editProduct
);

/**
 * Delete product
 * /products/delete => POST method
 */
router.delete("/delete/:productId", ProductsControllers.deleteProductById);

module.exports = router;
