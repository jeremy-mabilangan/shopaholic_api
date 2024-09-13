const express = require("express");
const router = express.Router();

const ProductsControllers = require("../controllers/products");

/**
 * 1. Save product
 * 2. Edit product
 * /product => POST method
 *
 * To edit product, just add "id" in body of request.
 */
router.post("/", ProductsControllers.postProduct);

/**
 * Get all products
 * /product => GET method
 */
router.get("/", ProductsControllers.getProducts);

/**
 * Get product by product id
 * /product/:productId => GET method
 */
router.get("/:productId", ProductsControllers.getProductById);

/**
 * Edit product by product id
 * /product/edit/:productId => POST method
 */
router.post("/edit/:productId", ProductsControllers.editProduct);

/**
 * Delete product
 * /product/delete => POST method
 */
router.delete("/delete/:productId", ProductsControllers.deleteProductById);

module.exports = router;
