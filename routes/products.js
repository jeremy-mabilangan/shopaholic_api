const express = require("express");
const router = express.Router();

const ProductsControllers = require("../controllers/products");

/**
 * 1. Save product
 * 2. Edit product
 * /products => POST method
 *
 * To edit product, just add "id" in body of request.
 */
router.post("/", ProductsControllers.postProduct);

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
router.post("/edit/:productId", ProductsControllers.editProduct);

/**
 * Delete product
 * /products/delete => POST method
 */
router.delete("/delete/:productId", ProductsControllers.deleteProductById);

module.exports = router;
