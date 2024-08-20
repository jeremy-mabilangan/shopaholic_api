const express = require("express");
const router = express.Router();

const ProductControllers = require("../controllers/product");

/**
 * 1. Save product
 * 2. Edit product
 * /product => POST method
 *
 * To edit product, just add "id" in body of request.
 */
router.post("/", ProductControllers.postProduct);

/**
 * Get all products
 * /product => GET method
 */
router.get("/", ProductControllers.getProducts);

/**
 * Get product by product id
 * /product/:productId => GET method
 */
router.get("/:productId", ProductControllers.getProductById);

/**
 * Delete product
 * /product/delete => POST method
 */
router.post("/delete", ProductControllers.deleteProductById);

module.exports = router;
